import { IsNotEmpty, IsString } from "class-validator";

export class DeleteUserDto {
    @IsNotEmpty()
    @IsString()
    id: string;
}