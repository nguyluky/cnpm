import {
    Formats,
    IsArray,
    IsBoolean,
    IsEnum,
    IsNumber,
    IsObject,
    IsString,
} from "@lib/type_declaration";
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
  @IsString({ optional: true })
  __?: string;

  static parse(obj: any) {
    return obj;
  }
}

export class BusMetadata extends ObjectType {
  @IsString({ optional: true })
  color?: string;

  @IsString({ optional: true })
  brand?: string;

  @IsNumber({ optional: true })
  madeYear?: number;

  @IsBoolean({ optional: true })
  camera?: boolean;

  static parse<T extends ObjectType>(this: new () => T, data: any): T {
    const ins = new this();
    Object.assign(ins, data || {});
    return ins;
  }
}

export class BusData extends ObjectType {
  @IsString({
    format: Formats.uuid,
  })
  id: string;

  @IsString()
  licensePlate: string;

  @IsNumber()
  capacity: number;

  @IsObject(BusMetadata)
  metadata: BusMetadata;
}

export class RouteMeta extends ObjectType {
  @IsString({ optional: true })
  Color?: string;

  @IsString({ optional: true })
  Headway?: string;

  @IsNumber({ optional: true })
  Distance?: number;

  @IsObject(Object)
  encodedPath?: Object;

  @IsString({ optional: true })
  OperationTime?: string;
}

export class RouteData extends ObjectType {
  @IsString({
    format: Formats.uuid,
  })
  id: string;

  @IsString()
  name: string;

  @IsObject(GeoLocation)
  startLocation: GeoLocation;

  @IsObject(GeoLocation)
  endLocation: GeoLocation;

  @IsObject(RouteMeta)
  metadata: RouteMeta;
}

export class StopPointsMeta extends ObjectType {
  @IsString({ optional: true })
  zone?: string;

  @IsString({ optional: true })
  ward?: string;

  @IsString({ optional: true })
  addressNo?: string;

  @IsString({ optional: true })
  street?: string;

  @IsString({ optional: true })
  supportDisability?: string;

  @IsString({ optional: true })
  status?: string;

  @IsString({ optional: true })
  search?: string;
}

export class StopPointsData extends ObjectType {
  @IsString({
    format: Formats.uuid,
  })
  id: string;

  @IsString()
  name: string;

  @IsObject(GeoLocation)
  location: GeoLocation;

  @IsObject(StopPointsMeta)
  meta: StopPointsMeta;
}

export class EmergencyContact extends ObjectType {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  relation: string;

  static parse<T extends ObjectType>(this: new () => T, data: any): T {
    const ins = new this();
    Object.assign(ins, data || {});
    return ins;
  }
}

export class StudentMetadata extends ObjectType {
  @IsString({ optional: true })
  gender?: string;

  @IsString({ optional: true })
  birthday?: string;

  @IsString({ optional: true })
  school?: string;

  @IsObject(EmergencyContact, { optional: true })
  emergencyContact?: EmergencyContact;

  static parse<T extends ObjectType>(this: new () => T, data: any): T {
    const ins = new this();
    Object.assign(ins, data || {});
    return ins;
  }
}

export class StudentData extends ObjectType {
  @IsString({
    format: Formats.uuid,
  })
  id: string;

  @IsString()
  name: string;

  @IsString({
    format: Formats["iso.datetime"],
  })
  createdAt: string;

  @IsString({
    format: Formats["iso.datetime"],
  })
  updatedAt: string;

  @IsObject(StudentMetadata)
  metadata: StudentMetadata;

  static parse<T extends ObjectType>(this: new () => T, data: any): T {
    const ins = new this();
    Object.assign(ins, data);
    return ins;
  }
}


export class RouteInfo extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    name: string;
}


export class RouteInfoWithPath extends RouteInfo {

    @IsArray(Object)
    path: number[][];

    @IsString()
    startTime: string;

}
export class StopPointTrip extends ObjectType {

    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsArray(Number)
    location: number[];

    @IsNumber()
    sequence: number;

    @IsEnum({
        value: ['PENDING', 'ARRIVED', 'DONE', 'SKIPPED'],
    })
    status: 'PENDING' | 'ARRIVED' | 'DONE' | 'SKIPPED';

}

