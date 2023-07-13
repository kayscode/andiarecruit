import { IsAlpha, IsEnum, IsOptional, IsString } from "class-validator";
import { UserType } from "../utils/user-type.enum";


export class FilterUserDto {

    @IsOptional()
    @IsEnum(UserType)
    public role?: UserType;

    @IsOptional()
    @IsString()
    @IsAlpha()
    public search?: string;
}