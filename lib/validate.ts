import * as z from "zod/v4";
import { Request, Response, NextFunction } from 'express'
import { ZodBadRequestError } from './exception';
import { toSchema } from "@lib/type_declaration";
import "reflect-metadata"
import { wa } from "./PropertyKey";

export const SCHEMA_RES_KEY = "res_schema_key"


export class AnyObject {
    static parse<T extends AnyObject>(this: new () => T, data: T): any {}
}

export class ObjectType extends AnyObject {

    static parse<T extends ObjectType>(this: new () => T, data: T): T {
        const ins = new this();
        Object.assign(ins, data);
        return ins;
    }
}

export class ArrayType<T> extends AnyObject {
    items!: T[];

    static parseItems<T>(data: Partial<ArrayType<T>>): T[] {
        const ins = new this() as ArrayType<T>;
        Object.assign(ins, data);
        return ins.items;
    }
}

// Generic kiểu cho "class constructor" kế thừa Class_
export type ClassType_<T extends AnyObject = AnyObject> = new (...args: any[]) => T;

// ApiSchemas nhận bất kỳ subclass nào của Class_
export interface ApiSchemas<
    B extends ObjectType = any,
    P extends ObjectType = any,
    Q extends ObjectType = any,
    R extends ObjectType = any
> {
    body?: ClassType_<B> | ClassType_<B>[];
    params?: ClassType_<P>;
    query?: ClassType_<Q> | ClassType_<Q>[];
    res?: ClassType_<R> | ClassType_<R>[];
}


export const validated_build = (schemas_zod: {[key: string]: z.ZodTypeAny}) => 
    (req: Request, res: Response, next: NextFunction) => {
    for (const [key, value] of Object.entries(schemas_zod)) {
        const data = value.safeParse((req as any)[key]);
        if (data.success) (req as any)[key] = data.data;
        else throw new ZodBadRequestError(data.error);
    }
}

export function Validate(schemas: ApiSchemas) {
    return function (target: any, key: string | ClassFieldDecoratorContext, descriptor: any) {
        Reflect.defineMetadata(SCHEMA_RES_KEY, schemas, target, wa(key));
    } 
}
