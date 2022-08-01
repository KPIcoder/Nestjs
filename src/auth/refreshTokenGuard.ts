import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";

@Injectable()
export class GuardRefreshToken implements CanActivate {
    constructor( private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeaders = request.headers.authorization;
            const bearer = authHeaders.split(' ')[0];
            const token = authHeaders.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User is not authorized'})
            }

            request.user = this.jwtService.verify(token, {
                secret: process.env.REFRESH_TOKEN_SECRET,
                publicKey: process.env.JWT_SECRET,
            });
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: 'Authorization error'})
        }
    }
}
