import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './model/dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return req.user;
  }

  @Post('signup')
  signUp(@Body() signupDto: SignUpDto) {
    return this.authService.signUp(signupDto);
  }
}
