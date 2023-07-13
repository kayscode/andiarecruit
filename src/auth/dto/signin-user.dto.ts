import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class SignInUser {

    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}