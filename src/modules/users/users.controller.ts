import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserRequest } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { UserReq } from '../auth/jwt.strategy';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get('profile')
  async getProfile(@UserRequest() user: UserReq) {
    const data = this.userServiceClient.send({ cmd: 'get_profile' }, user);
    return data;
  }

  @Get('')
  @Public()
  async get() {
    console.log('get list users');
    const data = this.userServiceClient.send({ cmd: 'get_users' }, {});
    return data;
  }

  @Post('profile')
  async update(@UserRequest() user: UserReq, @Body() updateDto: UpdateUserDto) {
    const data = await this.userServiceClient.send(
      { cmd: 'update_user' },
      { ...user, ...updateDto },
    );
    return data;
  }
}
