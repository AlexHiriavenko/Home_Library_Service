import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { validationPipe } from 'src/common/pipes/validation.pipe';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UsePipes(validationPipe)
  async signup(@Body() signupUserDto: SignupUserDto) {
    return await this.authService.signup(signupUserDto);
  }

  @Post('login')
  @UsePipes(validationPipe)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshToken: RefreshTokensDto) {
    return await this.authService.refresh(refreshToken);
  }
}
