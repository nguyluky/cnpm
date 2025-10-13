import { Formats, IsNumber, IsObject, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";

export class PaginationMetaData extends ObjectType {
    @IsNumber()
    total: number;

    @IsNumber()
    page: number;

    @IsNumber()
    limit: number;

    @IsNumber()
    totalPages: number;
}

export class PaginatedQuery {
    @IsString({
        optional: true,
        description: "Search term to filter results",
    })
    search?: string;

    @IsNumber({
        coerce: true,
        min: 1,
        description: "Page number, minimum is 1",
    })
    page: number = 1;

    @IsNumber({
        coerce: true,
        min: 1,
        max: 100,
        description: "Number of items per page, minimum is 1 and maximum is 100",
    })
    limit: number = 10;
}


export class GeoLocation extends ObjectType {
    @IsNumber({
        description: "Latitude must be between -90 and 90",
    })
    latitude: number;

    @IsNumber({
        description: "Longitude must be between -180 and 180",
    })
    longitude: number;

    static parse<T extends ObjectType>(this: new () => T, data: any): T {
        const ins = new this();
        Object.assign(ins, data);
        return ins;
    }
}

export class AnyObject extends ObjectType {
    @IsString({})
    __: string;

    static parse(obj: any) {
        return obj;
    }
}



export class BusData extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsString()
    licensePlate: string;

    @IsNumber()
    capacity: number;

    @IsObject(AnyObject)
    metadata: AnyObject;
}


export class RouteData extends ObjectType {

    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsString()
    name: string;

    @IsObject(GeoLocation)
    startLocation: GeoLocation;

    @IsObject(GeoLocation)
    endLocation: GeoLocation;

    @IsObject(Object)
    metadata: Object;
}

export class StopPointsData extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsString()
    name: string;

    @IsObject(GeoLocation)
    location: GeoLocation;

    // @IsNumber()
    // sequence: number;

    @IsObject(AnyObject)
    meta: AnyObject;
}

export class StudentData extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;
    
    @IsString()
    name: string;

    @IsObject(StopPointsData, {
        optional: true
    })
    stopPoint?: StopPointsData;
}
