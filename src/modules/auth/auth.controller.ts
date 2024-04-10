import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './model/dto/signup.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
@ApiTags('Auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(
      signInDto?.userName,
      signInDto?.password,
    );
  }

  @Post('signup')
  signUp(@Body() signupDto: SignUpDto) {
    return this.authService.signUp(signupDto);
  }
}
