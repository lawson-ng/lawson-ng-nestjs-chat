import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from 'src/modules/users/model/users.schema';

export const UserRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDocument;
  },
);
