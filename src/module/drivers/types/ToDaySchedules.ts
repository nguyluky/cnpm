import { IsString, IsEnum } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";


export class ToDaySchedules extends ObjectType {

    @IsString()
    scheduleId: string;

    @IsString()
    tripId: string;

    @IsString()
    date: string;

    @IsEnum({
        value: ['PLANNED', 'ONGOING', 'COMPLETED', 'CANCELLED'],
    })
    status: 'PLANNED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

    @IsString()
    startTime: string;

}

