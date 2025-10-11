import { Formats, IsArray, IsEnum, IsObject, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";
import { BusData, RouteData } from "@src/types/share.type";

export class TimeTable extends ObjectType {
    @IsString()
    dayOfWeek: string;

    @IsString()
    departureTime: string;
}


export class ScheduleInfo extends ObjectType {
    @IsString({
        format: Formats.uuid
    })
    id: string;

    @IsObject(BusData)
    bus: BusData;

    @IsArray(TimeTable)
    times: TimeTable[];

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

    @IsString({
        format: Formats["iso.time"]
    })
    startTime: string;

    @IsEnum({
        value: ["MORNING", "AFTERNOON"],
    })
    type: "MORNING" | "AFTERNOON" = "MORNING";

}
