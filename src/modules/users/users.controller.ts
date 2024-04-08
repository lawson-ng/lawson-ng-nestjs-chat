import { Controller, Get, Ip, Request } from '@nestjs/common';
import { UserRequest } from 'src/decorators/user.decorator';
import { UserDocument } from './model/users.schema';
import { UserEntity } from './model/user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UsersService) { }
  //
  // @Get('hello')
  // @Public()
  // async hello(@Ip() ip) {
  //   return 'hello';
  // }
  //
  @Get('profile')
  async getProfile(@UserRequest() user: UserDocument) {
    return new UserEntity(user);
  }

  @Get('')
  @Public()
  async get() {
    const docs = await this.userService.get();
    return docs.map((doc) => new UserEntity(doc));
  }
}
