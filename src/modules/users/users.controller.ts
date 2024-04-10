import { Controller, Get, Inject } from '@nestjs/common';
import { UserRequest } from 'src/decorators/user.decorator';
import { UserDocument } from './model/users.schema';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get('profile')
  async getProfile(@UserRequest() user: UserDocument) {
    const data = this.userServiceClient.send({ cmd: 'get_profile' }, user);
    return data;
  }

  @Get('')
  @Public()
  async get() {
    const data = this.userServiceClient.send({ cmd: 'get_users' }, {});
    return data;
  }
}
