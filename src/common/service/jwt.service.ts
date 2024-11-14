import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JWTService {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async generateToken(data: { sub: string }) {
        return this.jwtService.signAsync(data);
    }

    async validateToken(token: string) {
        return this.jwtService.verifyAsync(token);
    }
}