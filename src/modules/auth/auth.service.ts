import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { SignUpDto } from './model/dto/signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, pass: string) {
    const user = await this.userService.findOne(userName);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.userName, id: user.id };
    return {
      userName: user.userName,
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }

  async signUp(signupData: SignUpDto) {
    const { userName, password, confirmPassword } = signupData;
    if (password !== confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp.');
    }
    const isExistUserName = await this.isExistUserName(userName);
    if (isExistUserName) {
      throw new BadRequestException('Tài khoản đã tồn tại.');
    }
    await this.userService.create(signupData);
    return { userName };
  }

  isExistUserName = async (userName: string) => {
    const user = await this.userService.findOne(userName);
    return !!user;
  };
}
