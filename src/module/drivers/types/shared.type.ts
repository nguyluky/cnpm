import { IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";

export class RouteInfo extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    name: string;
}



export class BusInfo extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    licensePlate: string;
}

