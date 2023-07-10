import { ROLE_USER } from '@Constants/index';
import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';

export const UserInfo = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as string;
});

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE_USER[]) => SetMetadata(ROLES_KEY, roles);