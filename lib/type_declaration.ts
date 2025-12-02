import "reflect-metadata";
import * as z from "zod/v4";
import { PropertyKey, wa } from "./PropertyKey";
import { ClassType_ } from "./validate";

// Khóa metadata cho schema
const SCHEMA_METADATA_KEY = Symbol("schema");
const SCHEMA_DATA_METADATA_KEY = Symbol("schemaData");
const CONTEXT_TYPE_METADATA_KEY = Symbol("contextType");

interface SchemaData {
    cache?: z.ZodObject<any>;
    usageCount?: number;
    // Tên class để kiểm tra cache có đúng class không
    // Tránh trường hợp class con kế thừa class cha
    className?: string;
}

export enum Formats {
    /**
     * email format (see https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address)
     * example:
     *  - valid: "abc@gmail.com"
     *  - invalid: "abc"
    */
    "email",

    /**
    * UUID format (see https://en.wikipedia.org/wiki/Universally_unique_identifier)
    * example:
    *  - valid: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    *  - invalid: "3fa85f64-5717-4562-b3fc-2c963f66afaZ"
   */
    "uuid",
    /**
    * URL format (see https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL)
    * example:
    *  - valid: "https://example.com"
    *  - invalid: "htp://example.com"
   */
    "url",
    /**
    * Emoji format (see https://unicode.org)
    * example:
    *  - valid: "😀"
    *  - invalid: "abc"
   */
    // "emoji",         // validates a single emoji character
    /**
    * Base64 format (see https://en.wikipedia.org/wiki/Base64)
    * example:
    *  - valid: "SGVsbG8gd29ybGQ="
    *  - invalid: "Hello world"
   */
    // "base64",
    /**
    * Base64url format (see https://en.wikipedia.org/wiki/Base64#Variants_summary)
    * example:
    *  - valid: "SGVsbG8gd29ybGQ"
    *  - invalid: "Hello world"
   */
    // "base64url",
    /**
    * Nano ID format (see https://github.com/ai/nanoid?tab=readme-ov-file)
    * example:
    *  - valid: "V1StGXR8_Z5jdHi6B-myT"
    *  - invalid: "Hello world"
   */
    // "nanoid",
    // "cuid",
    // "cuid2",
    // "ulid",
    /**
    * IPv4 format (see https://en.wikipedia.org/wiki/IPv4)
    * example:
    *  - valid: "192.168.1.1"
    *  - invalid: "256.256.256.256"
   */
    "ipv4",
    /**
    * IPv6 format (see https://en.wikipedia.org/wiki/IPv6)
    * example:
    *  - valid: "2001:0db8:85a3:0000:0000:8a2e:0370:7334"
    *  - invalid: "2001:0db8:85a3:0000:0000:8a2e:0370:733Z"
   */
    "ipv6",
    // "cidrv4",        // ipv4 CIDR block
    // "cidrv6",        // ipv6 CIDR block
    /**
    * ISO 8601 date format (see https://en.wikipedia.org/wiki/ISO_8601)
    * example:
    *  - valid: "2023-10-05"
    *  - invalid: "05/10/2023"
   */
    "iso.date",
    /**
    * ISO 8601 time format (see https://en.wikipedia.org/wiki/ISO_8601)
    * example:
    *  - valid: "14:30:00"
    *  - invalid: "2:30 PM"
   */
    "iso.time",
    /**
    * ISO 8601 datetime format (see https://en.wikipedia.org/wiki/ISO_8601)
    * example:
    *  - valid: "2023-10-05T14:30:00Z"
    *  - invalid: "2023-10-05 14:30:00"
   */
    "iso.datetime",
    /**
    * ISO 8601 duration format (see https://en.wikipedia.org/wiki/ISO_8601#Durations)
    * example:
    *  - valid: "P3Y6M4DT12H30M5S"
    *  - invalid: "3 years, 6 months, 4 days, 12 hours, 30 minutes, and 5 seconds"
   */
    "iso.duration",
}


// Interface cho các tùy chọn của decorator
interface NumberOptions {
    min?: number;
    max?: number;
    optional?: boolean;
    coerce?: boolean;
    description?: string;
}

interface StringOptions {
    minLength?: number;
    maxLength?: number;
    optional?: boolean;
    format?: Formats
    description?: string;
}

interface BooleanOptions {
    optional?: boolean;
    description?: string;
    coerce?: boolean;
}

interface ArrayOptions {
    minItems?: number;
    maxItems?: number;
    optional?: boolean;
    description?: string;
}

interface ObjectOptions {
    optional?: boolean;
    description?: string;
}

interface EnumOptions {
    value: string[]
    optional?: boolean;
    description?: string;
}


function addFormat(format: Formats) {
    switch (format) {
        case Formats.email: return z.email()
        case Formats.uuid: return z.uuid()
        case Formats.url: return z.url()
        // case Formats.emoji: return z.emoji()
        // case Formats.base64: return z.base64()
        // case Formats.base64url: return z.base64url()
        // case Formats.nanoid: return z.nanoid()
        // case Formats.cuid: return z.cuid()
        // case Formats.cuid2: return z.cuid2()
        // case Formats.ulid: return z.ulid()
        case Formats.ipv4: return z.ipv4()
        case Formats.ipv6: return z.ipv6()
        // case Formats.cidrv4: return z.cidrv4()
        // case Formats.cidrv6: return z.cidrv6()
        case Formats["iso.date"]: return z.iso.date()
        case Formats["iso.time"]: return z.iso.time()
        case Formats["iso.datetime"]: return z.iso.datetime()
        case Formats["iso.duration"]: return z.iso.duration()
    }

    console.log("Unknown format, return string", format);

    return z.string();
}

// Decorator cho Number
export function IsNumber(options: NumberOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.number();
        if (options.coerce) schema = z.coerce.number();
        if (options.min !== undefined) schema = schema.min(options.min);
        if (options.max !== undefined) schema = schema.max(options.max);
        if (options.optional) schema = schema.optional();
        if (options.description) schema = schema.meta({ description: options.description });
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho String
export function IsString(options: StringOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any;
        if (options.format !== undefined) {
            schema = addFormat(options.format);
        }
        else {
            schema = z.string();
            if (options.minLength !== undefined) schema = schema.min(options.minLength);
            if (options.maxLength !== undefined) schema = schema.max(options.maxLength);
        }
        if (options.optional) schema = schema.optional();
        if (options.description) schema = schema.meta({ description: options.description });
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho Boolean
export function IsBoolean(options: BooleanOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any;
        if (options.coerce) schema = z.coerce.boolean();
        else schema = z.boolean();

        if (options.optional) schema = schema.optional();
        if (options.description) schema = schema.meta({ description: options.description });
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho Array
export function IsArray<T extends ClassType_>(targetClass: T, options: ArrayOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        const itemSchema = toSchema(targetClass, true);
        let schema: any = z.array(itemSchema!);
        if (options.minItems !== undefined) schema = schema.min(options.minItems);
        if (options.maxItems !== undefined) schema = schema.max(options.maxItems);
        if (options.optional) schema = schema.optional();
        if (options.description) schema = schema.meta({ description: options.description });
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

// Decorator cho Object
export function IsObject<T extends ClassType_>(targetClass: T, options: ObjectOptions = {}) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = toSchema(targetClass, true);
        if (options.optional) schema = schema.optional();
        if (options.description) schema = schema.meta({ description: options.description });
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}


export function IsEnum(options: EnumOptions) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.enum(options.value);
        if (options.optional) schema = schema.optional();
        if (options.description) schema = schema.meta({ description: options.description });
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

interface FileOptions {
    optional?: boolean;
    maxSize?: number; // in bytes
    allowedTypes?: string; // e.g. ["image/png", "image/jpeg"]
    minSize?: number; // in bytes
}

export function IsFile(options?: FileOptions) {
    return function (target: any, propertyKey: PropertyKey) {
        let schema: any = z.file();
        if (options?.optional) schema = schema.optional();
        if (options?.maxSize) schema = schema.max(options.maxSize,);
        if (options?.minSize) schema = schema.min(options.minSize,);
        if (options?.allowedTypes) {

            schema = schema.mime(options.allowedTypes)
        }
        Reflect.defineMetadata(SCHEMA_METADATA_KEY, schema, target, wa(propertyKey));
    };
}

export function ContextType(conextType: string) {
    return function (target: any) {
        Reflect.defineMetadata(CONTEXT_TYPE_METADATA_KEY, conextType, target);
    };
}


export function getContextType(target: any): string | undefined {
    return Reflect.getMetadata(CONTEXT_TYPE_METADATA_KEY, target) as string | undefined;
}


// trường hợp class chùng tên nhưng khác module thì sẽ không cache chung
const globalSchemaCache: Map<Function, SchemaData> = new Map();

const defaultTypeMap: Map<Function, z.ZodTypeAny> = new Map();
defaultTypeMap.set(String, z.string());
defaultTypeMap.set(Number, z.number());
defaultTypeMap.set(Boolean, z.boolean());
defaultTypeMap.set(Date, z.date());
defaultTypeMap.set(Object, z.any());
defaultTypeMap.set(Array, z.array(z.any()));


// Hàm toSchema để tạo Zod schema từ class
export function toSchema<T extends ClassType_>(target: T, allowSaveGb = false): z.ZodTypeAny | null {

    if (defaultTypeMap.has(target as any)) {
        return defaultTypeMap.get(target as any)!;
    }

    // Kiểm tra cache trước
    let cache = globalSchemaCache.get(target);

    if (!cache) {
        cache = {};
        globalSchemaCache.set(target, cache);
    }

    if (cache.cache && allowSaveGb) {
        cache.usageCount = (cache.usageCount || 0) + 1;

        // Nếu cache đã được sử dụng quá nhiều lần, thì lưu nó vào globle registry
        if (cache.usageCount >= 2 && !z.globalRegistry.has(cache.cache)) {
            console.log(`Cache schema of ${target.name} to global registry`);
            // random suffix to avoid name conflict
            const module_name = (target as any).module_name;
            // console.log('module_name', module_name);
            z.globalRegistry.add(cache.cache, { id: module_name ? `${module_name}.${target.name}` : target.name });
        }

        return cache.cache;
    }

    const obj = new target() as Object;


    // if (obj instanceof ArrayType) {
    //     const itemSchema = toSchema(obj.itemType, true);
    //
    //     const arraySchema = z.array(itemSchema!);
    //     if (obj.minItems !== undefined) arraySchema.min(obj.minItems);
    //     if (obj.maxItems !== undefined) arraySchema.max(obj.maxItems);
    //     if (obj.optional) return arraySchema.optional();
    //     return arraySchema;
    // }

    const schemaObject: Record<string, z.ZodTypeAny> = {};
    for (const propertyKey of Object.getOwnPropertyNames(obj)) {
        let schema = Reflect.getMetadata(SCHEMA_METADATA_KEY, obj, propertyKey);
        const default_value = (obj as any)[propertyKey];
        if (schema) {
            if (default_value) schema = schema.default(default_value)
            schemaObject[propertyKey] = schema;
        }

    }

    if (Object.keys(schemaObject).length === 0) {
        return null;
    }

    const zodSchema = z.object(schemaObject);
    // Lưu schema vào metadata để tái sử dụng
    cache.cache = zodSchema;
    cache.usageCount = 1;

    return zodSchema;
}

export function toJsonSchema<T extends ClassType_>(target: T | T[]) {
    try {
        if (Array.isArray(target)) {
            let b = target.map(e => toSchema(e)).filter(e => e !== null);
            return z.toJSONSchema(z.union(b));
        }
        const zod_schema = toSchema(target);

        if (!zod_schema) {
            return null;
        }

        return z.toJSONSchema(zod_schema);
    } catch (error) {
        console.error("Error in toJsonSchema:", error);
        throw error;
    }
}

