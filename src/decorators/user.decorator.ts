import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserReq } from 'src/modules/auth/jwt.strategy';

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserReq;
  },
);
