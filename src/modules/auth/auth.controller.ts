import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './model/dto/signup.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() signInDto: Record<string, any>) {
    return 200;
    return await this.authService.signIn(
      signInDto?.userName,
      signInDto?.password,
    );
  }

  @Post('signup')
  signUp(@Body() signupDto: SignUpDto) {
    console.log('signup', signupDto)
    return this.authService.signUp(signupDto);
  }
}
