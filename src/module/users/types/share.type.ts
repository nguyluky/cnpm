import { IsArray, IsNumber, IsString } from "@lib/type_declaration";
import { ObjectType } from "@lib/validate";


export class RoleData extends ObjectType {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsArray(String)
    permissions: string[];
}
export class UserData extends ObjectType {
    @IsString()
    id: string;

    @IsString()
    username: string;

    @IsArray(String)
    roles: string[];

    @IsString()
    email: string;

    @IsString()
    createdAt: string;

    @IsString()
    updatedAt: string;
}

