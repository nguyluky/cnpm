import { Formats, IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { BusData, RouteData } from "@src/types/share.type";

export class TimeTable extends ObjectType {
    @IsArray(Number)
    dayOfWeek: number[];

    @IsString({
        format: Formats["iso.time"]
    })
    departureTime: string;
}

export class DriverData extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsString()
    name: string;

    @IsString()
    email: string;
}

export class ScheduleInfo extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsObject(BusData)
    bus: BusData;

    @IsObject(DriverData)
    driver: DriverData;

    @IsObject(TimeTable)
    times: TimeTable;

    @IsObject(RouteData)
    route: RouteData;

    @IsObject(Object)
    meta: any

    @IsString({
        format: Formats["iso.datetime"]
    })
    startDate: string;

    @IsString({
        format: Formats["iso.datetime"]
    })
    endDate: string;

    @IsEnum({
        value: ["DISPATCH", "RETURN"],
    })
    type: "DISPATCH" | "RETURN";

}
