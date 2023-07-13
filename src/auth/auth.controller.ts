import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { SignInUser } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post("sign-up")
    async singUp(@Body() createUsetDto: CreateUserDto): Promise<User> {
        return this.authService.signUp(createUsetDto);
    }

    @Post("sign-in")
    async signIn(@Body() signInUser: SignInUser): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInUser);
    }

    @Post("logout")
    @UseGuards(AuthGuard())
    async logout() {

    }

}
