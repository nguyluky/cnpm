import { IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";

export class BusInfo extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    licensePlate: string;
}

