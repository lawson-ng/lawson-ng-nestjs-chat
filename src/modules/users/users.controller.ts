import { Controller, Get } from '@nestjs/common';
// import { UsersService } from './users.service';
import { UserRequest } from 'src/decorators/user.decorator';
import { UserDocument } from './model/users.schema';
import { UserEntity } from './model/user.entify';

@Controller('users')
export class UserController {
  // constructor(private userService: UsersService) {}

  @Get('profile')
  async getProfile(@UserRequest() user: UserDocument) {
    return new UserEntity(user);
  }
}
