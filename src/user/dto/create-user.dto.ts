import { IsNotEmpty, IsEmail, MinLength, IS_IN, IsIn, IsString } from 'class-validator';
import { UserType } from '../utils/user-type.enum';

export class CreateUserDto {
    public id: string;

    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsEmail()
    public email: string;

    @MinLength(8)
    public password: string;

    @IsIn([UserType.JOB_POSTER, UserType.JOB_SEEKER, UserType.COMPANY])
    public role: UserType;
}
