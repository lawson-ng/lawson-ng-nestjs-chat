import { Controller, Get } from '@nestjs/common';
// import { UsersService } from './users.service';
import { UserRequest } from 'src/decorators/user.decorator';
import { UserDocument } from './model/users.schema';
import { UserEntity } from './model/user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@Public()
export class UserController {
  constructor(private userService: UsersService) {}

  @Get('hello')
  async hello() {
    return 'hello';
  }

  @Get('profile')
  async getProfile(@UserRequest() user: UserDocument) {
    return new UserEntity(user);
  }

  // TODO: authorization - only admin
  @Get('')
  @Public()
  async get() {
    return this.userService.get();
  }
}
