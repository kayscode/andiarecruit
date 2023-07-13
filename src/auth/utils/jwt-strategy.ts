import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "src/user/repositories/user.repository";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: "somesecretcode",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.getRepository().findOneBy({ username: username });

        if (!user) {
            throw new UnauthorizedException("you can't login");
        }

        return user;
    }

}