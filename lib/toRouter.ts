// TODO: 
// - [x] convert class declaration to routerSchema
// - [x] convert routerSchema to express router
// - [x] convert routerSchema to swagger schema
// - test

import { BadRequestError, UnauthorizedError, ZodBadRequestError } from "./exception";
import { expressToSwaggerPath } from "./express2swaggerPath";
import { NextFunction, Request, Response, Router } from "express";
import z, { globalRegistry } from "zod/v4";
import { HTTP_INFO_KEY, HTTP_RESP_KEY, HttpInfo, RespData } from "./httpMethod";
import { getContextType, toSchema } from "./type_declaration";
import { ApiSchemas, ObjectType, SCHEMA_RES_KEY } from "./validate";
import { json } from "stream/consumers";


const toJSONSchema = (schema: z.ZodTypeAny) => {
    try {
        // @ts-ignore
        const schema_ = z.toJSONSchema(schema, {
            uri: (id: string) => `#/components/schemas/${id}`,
            external: {
                registry: globalRegistry,
                uri: (id: string) => `#/components/schemas/${id}`,
                defs: {}
            }
        });

        return schema_
    } catch (error) {
        console.error("Error converting to JSON Schema:", error);
        console.log((schema as any).shape);
        throw error;
    }
}

interface ZodApiSchemas {
    body?: {
        contextType?: string;
        schema: z.ZodTypeAny | z.ZodTypeAny[];
        schemaClass: any | any[];
    };
    query?: {
        contextType?: string;
        schema: z.ZodTypeAny | z.ZodTypeAny[];
        schemaClass: any | any[];
    };
    params?: {
        contextType?: string;
        schema: z.ZodTypeAny;
        schemaClass: any | any[];
    };
    res?: {
        contextType?: string;
        schema: z.ZodTypeAny | z.ZodTypeAny[];
        schemaClass: any | any[];
    };
}

export interface RouterSchema {
    httpInfo: HttpInfo;
    target_class: any;
    handler: any;
    subRouter?: RouterSchema[];
    schema?: ZodApiSchemas;
    errors?: Error[]
}

function convertToZodSchemas(schemas: ApiSchemas, module?: string): ZodApiSchemas {
    const schema_zod: ZodApiSchemas = {};
    for (const key of ['body', 'query', 'params', 'res'] as (keyof ApiSchemas)[]) {
        const value = (schemas || {})[key];
        if (!value) continue;
        if (Array.isArray(value) && key != 'params') {
            const sch = value.map((e) => {
                (e as any).module_name = module ? module : "";
                return toSchema(e)
            }).filter((e) => e !== null);
            schema_zod[key] = {
                schemaClass: value,
                schema: sch,
            }
            continue;
        }

        (value as any).module_name = module ? module : "";
        const sch = toSchema(value as any);
        const contextType = getContextType(value);
        if (!sch) continue;

        schema_zod[key] = {
            contextType: contextType,
            schema: sch,
            schemaClass: value,
        }
    }
    return schema_zod;
}


export function toRouterSchema(target: any): RouterSchema[] {
    const routerSchema: RouterSchema[] = [];
    const controller = new target() as any;

    const methods = [
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(controller)),
        ...Object.getOwnPropertyNames(controller)
    ]

    for (const method of methods) {
        const httpInfo: HttpInfo = Reflect.getMetadata(HTTP_INFO_KEY, controller, method) as HttpInfo;
        const apiSchema: ApiSchemas = Reflect.getMetadata(SCHEMA_RES_KEY, controller, method) as ApiSchemas;
        const zodSchema = convertToZodSchemas(apiSchema, target.name);

        if (!httpInfo) continue;

        if (httpInfo.method == 'use') {
            const subRouterSchema: RouterSchema[] = toRouterSchema(controller[method]);
            const schema: RouterSchema = {
                httpInfo,
                target_class: target,
                handler: controller[method].bind(controller),
                subRouter: subRouterSchema
            };
            routerSchema.push(schema);
        }

        else {
            const errors = (Reflect.getMetadata("exception", controller, method) as Error[]) || [];
            // console.log("Errors for", method, ":", errors);
            const schema: RouterSchema = {
                httpInfo,
                target_class: target,
                handler: controller[method].bind(controller),
                schema: zodSchema,
                errors: errors
            };
            routerSchema.push(schema);
        }
    }
    return routerSchema;
}

// Validate request data
function validateRequest(
    schema_zod: ZodApiSchemas,
    req: Request
) {
    const newData = {
        body: req.body,
        query: req.query,
        params: req.params,
    }
    // for (const [key, schema] of Object.entries(schema_zod)) {
    for (const key of Object.keys(schema_zod) as (keyof ZodApiSchemas)[]) {
        const schema = schema_zod[key];
        if (key === "res") continue;

        if (!schema || !schema.schema) continue;

        // if schema is array
        if (Array.isArray(schema.schema)) {
            const dataParseArray = schema.schema.map((sch) => sch.safeParse((req as any)[key] || {}));

            const parsedData = dataParseArray.findIndex((p) => p.success);

            if (parsedData === -1) {
                console.error("Validation error:", (req as any)[key]);
                const allErrors = dataParseArray.map((p) => p.error).map((e) => z.treeifyError(e!));
                // merge all errors
                const mergedErrors = allErrors.reduce((acc, curr) => {
                    for (const [k, v] of Object.entries(curr)) {
                        if (!acc[k]) {
                            acc[k] = v;
                        } else {
                            acc[k] = acc[k].concat(v);
                        }
                    }
                    return acc;
                }, {} as any);

                throw new BadRequestError(JSON.stringify(mergedErrors));
            }

            (newData as any)[key] = new schema.schemaClass[parsedData]();
            Object.assign((newData as any)[key], dataParseArray[parsedData].data);
        }

        else {
            const dataParse = schema.schema.safeParse((req as any)[key] || {});
            console.log(dataParse)

            if (!dataParse.success) {
                console.error("Validation error:", (req as any)[key]);
                throw new ZodBadRequestError(dataParse.error);
            }

            (newData as any)[key] = new schema.schemaClass();
            Object.assign((newData as any)[key], dataParse.data);
        }
    }

    return newData;
}

async function handleRoute(
    classInstance: any,
    handler: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const data = await handler.call(classInstance, req, next);
    const respDeco = Reflect.getMetadata(HTTP_RESP_KEY, data.constructor) as RespData;
    if (respDeco) {
        return res.json({
            code: respDeco?.statusCode || 200,
            message: respDeco?.statusMess || "OK",
            data,
        });
    }
    else {
        res.send(data);
    }
}

export function toExpressRouter(routerSchema: RouterSchema[]): Router {
    const expressRouter = Router();

    for (const schema of routerSchema) {
        const { httpInfo, handler, subRouter, schema: schemaZod } = schema;

        if (httpInfo.method === 'use') {
            const subRouterExpress = toExpressRouter(subRouter || []);
            expressRouter.use(httpInfo.path, subRouterExpress);
        }
        else {
            const method = httpInfo.method.toLowerCase();
            // const validateWrapper =
            // console.log('Registering route:', method, httpInfo.path, 'for', schema.target_class.name);

            const authMiddlewares = [];
            if (schema.httpInfo.data?.isAuth) {
                for (const authSchema of schema.httpInfo.data.isAuth) {
                    authMiddlewares.push(async (req: Request, res: Response, next: NextFunction) => {
                        const data = await authSchema.validate(req);
                        if (!data) {
                            throw new UnauthorizedError("Unauthorized");
                        }
                        // Attach user data to request
                        for (const key of Object.keys(data)) {
                            (req as any)[key] = data[key];
                        }
                        next();
                    });
                }
            }

            // // middlewares
            // if (schema.httpInfo.data?.middlewares) {
            //     for (const mw of schema.httpInfo.data.middlewares) {
            //         authMiddlewares.push(mw);
            //     }
            // }

            (expressRouter as any)[method](httpInfo.path, ...authMiddlewares, async (req: Request, res: Response, next: any) => {

                const validatedData = {}
                Object.assign(validatedData, validateRequest(schemaZod || {}, req));

                // middleware
                for (const mw of schema.httpInfo.data?.middlewares || []) {
                    Object.assign(validatedData, (await mw(req, schema.httpInfo)) || {});
                }

                const _req = new Proxy(req, {
                    get(target, prop) {
                        if (prop in validatedData) {
                            return (validatedData as any)[prop];
                        }
                        return (target as any)[prop];
                    }
                });



                await handleRoute(schema.target_class, handler, _req, res, next);
            })

        }
    }


    return expressRouter;
}



export function toSwaggerSchema(routerSchema: RouterSchema[], swagger: any, path: string = ""): any {
    const swaggerSchemas: any = {};

    for (const schema of routerSchema) {
        const { httpInfo, handler, target_class, schema: zodSchema, errors } = schema;

        const swaggerPath = path + expressToSwaggerPath(httpInfo.path);
        if (httpInfo.method === 'use') {
            toSwaggerSchema(schema.subRouter || [], swagger, swaggerPath);
            continue;
        }

        const method = httpInfo.method.toLowerCase();
        const tags = httpInfo.data?.tags || [target_class.name];


        if (!swaggerSchemas[swaggerPath]) {
            swaggerSchemas[swaggerPath] = {};
        }

        swaggerSchemas[swaggerPath][method] = {
            tags: tags,
            summary: httpInfo.data?.summary,
            description: httpInfo.data?.description,
        };

        if (zodSchema?.body) {
            if (Array.isArray(zodSchema.body.schema)) {
                const newSchemas = z.union(zodSchema.body.schema);
                swaggerSchemas[swaggerPath][method].requestBody = {
                    content: {
                        [zodSchema.body.contextType || "application/json"]: {
                            schema: toJSONSchema(newSchemas)
                        }
                    },
                    required: true
                };
            }
            else {
                swaggerSchemas[swaggerPath][method].requestBody = {
                    content: {
                        [zodSchema.body.contextType || "application/json"]: {
                            schema: toJSONSchema(zodSchema.body.schema)
                        }
                    },
                    required: true
                };
            }
        }

        if (zodSchema?.query) {
            swaggerSchemas[swaggerPath][method].parameters = swaggerSchemas[swaggerPath][method].parameters || [];


            for (const key of Object.keys((zodSchema.query.schema as any).shape)) {
                const paramSchema = (zodSchema.query.schema as any).shape[key];
                swaggerSchemas[swaggerPath][method].parameters.push({
                    name: key,
                    in: "query",
                    schema: toJSONSchema(paramSchema)
                });
            }
        }

        if (zodSchema?.params) {
            swaggerSchemas[swaggerPath][method].parameters = swaggerSchemas[swaggerPath][method].parameters || [];
            const jsonParamSchema = toJSONSchema(zodSchema.params.schema);
            for (const key of Object.keys((zodSchema.params.schema as any).shape)) {
                const paramSchema = (zodSchema.params.schema as any).shape[key];
                const jsonSchema = toJSONSchema(paramSchema);
                swaggerSchemas[swaggerPath][method].parameters.push({
                    name: key,
                    in: "path",
                    required: jsonParamSchema.required?.includes(key) || false,
                    schema: jsonSchema

                });
            }
        }

        // Response schema

        if (zodSchema?.res) {
            swaggerSchemas[swaggerPath][method].responses = swaggerSchemas[swaggerPath][method].responses || {};

            let resSchemas = zodSchema.res.schemaClass;
            if (!Array.isArray(resSchemas)) {
                resSchemas = [resSchemas];
            }

            for (const resSchema of resSchemas) {
                const respDeco = Reflect.getMetadata(HTTP_RESP_KEY, resSchema) as RespData;
                const statusCode = respDeco?.statusCode || 200;
                const statusMess = respDeco?.statusMess || "OK";
                const zodSchema = toSchema(resSchema);
                // console.log("Zod schema:", zodSchema);
                swaggerSchemas[swaggerPath][method].responses[statusCode] = {
                    description: statusMess,
                    content: {
                        "application/json": {
                            schema: {
                                $schema: "http://json-schema.org/draft-07/schema#",
                                type: "object",
                                properties: {
                                    code: {
                                        type: "integer",
                                        description: "HTTP status code of the error",
                                        minimum: 200,
                                        maximum: 300,
                                    },
                                    message: {
                                        type: "string",
                                        description: "Human-readable error message",
                                    },
                                    data: zodSchema ? toJSONSchema(zodSchema) : undefined
                                },
                                required: [],
                            },

                        }
                    }
                };
            }

            // Add error responses
            for (const classError of errors || []) {
                if (!classError) continue;
                const errorDeco = Reflect.getMetadata(HTTP_RESP_KEY, classError) as RespData;
                const statusCode = errorDeco?.statusCode || 500;
                const statusMess = errorDeco?.statusMess || "Internal Server Error";
                swaggerSchemas[swaggerPath][method].responses[statusCode] = {
                    description: statusMess,
                    content: {
                        "application/json": {
                            schema: {
                                $schema: "http://json-schema.org/draft-07/schema#",
                                title: "ApiErrorResponse",
                                type: "object",
                                properties: {
                                    code: {
                                        type: "integer",
                                        description: "HTTP status code of the error",
                                        minimum: 400,
                                        maximum: 599,
                                    },
                                    message: {
                                        type: "string",
                                        description: "Human-readable error message",
                                    },
                                    name: {
                                        type: "string",
                                        description: "Error class name",
                                    },
                                },
                                required: [],
                            },
                        },
                    },
                }
            }
        }

        // get security schemes
        const authSchemes = httpInfo.data?.isAuth || [];
        if (authSchemes.length !== 0) {
            for (const scheme of authSchemes) {
                const authName = scheme.constructor.name;
                if (!swagger.components) {
                    swagger.components = {};
                }

                if (!swagger.components.securitySchemes) {
                    swagger.components.securitySchemes = {};
                }

                if (!swagger.components.securitySchemes[authName]) {
                    swagger.components.securitySchemes[authName] = scheme;
                }

                swaggerSchemas[swaggerPath][method].security = swaggerSchemas[swaggerPath][method].security || [];
                swaggerSchemas[swaggerPath][method].security.push({
                    [authName]: []
                });
            }
            swaggerSchemas[swaggerPath][method].responses = swaggerSchemas[swaggerPath][method].responses || {};
            swaggerSchemas[swaggerPath][method].responses[401] = {
                description: "Unauthorized",
                content: {
                    "application/json": {
                        schema: {
                            $schema: "http://json-schema.org/draft-07/schema#",
                            type: "object",
                            properties: {
                                code: { type: "integer", description: "HTTP status code of the error", minimum: 400, maximum: 599 },
                                message: { type: "string", description: "Human-readable error message" },
                            },
                            required: [],
                        }
                    }
                }
            };
        }
    }

    swagger.paths = { ...swagger.paths, ...swaggerSchemas };

    return swagger;
}

