import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

// Constants
import { EROLE_USER } from '@Constants/index.ts';

// Decorator
import { ROLES_KEY } from '@Decorators/index.ts';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<EROLE_USER[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);

        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
        });

        const { role } = payload;

        return requiredRoles.some((requireRole) => role?.includes(requireRole));

    }

    private extractToken(request: Request) {
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            return null;
        }

        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            return null;
        }

        return token;
    }
}
