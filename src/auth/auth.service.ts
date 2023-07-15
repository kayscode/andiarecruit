import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { SignInUser } from './dto/signin-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './utils/jwt-payload.interface';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(createUserDto);
    }

    async signIn(siginUserDto: SignInUser): Promise<{ accessToken: string }> {

        const { email, password } = siginUserDto;

        // if user is not found an error will be thrown by the repository
        let user = await this.userRepository.findUserByEmail(email);


        if (user) {
            let isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new UnauthorizedException("impossible to signin, wrong password");
            }
        }
        const payload: JwtPayload = { username: user.username, role: user.role, id: user.id };

        let accessToken: string = this.jwtService.sign(payload);

        return { accessToken };
    }
}
