import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/user/users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(signupUser: SignupUserDto) {
    return `signup ${signupUser}`;
  }

  async login(loginUser: LoginUserDto) {
    return `login ${loginUser}`;
  }

  async refresh(refreshToken: RefreshTokensDto) {
    return refreshToken;
  }
}
