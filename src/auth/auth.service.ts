import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/modules/user/users.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import * as bcrypt from 'bcrypt';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(signupUser: SignupUserDto) {
    const user = await this.usersService.findByLogin(signupUser.login);

    if (user) {
      throw new BadRequestException('User with this login already exists');
    }

    const userCreated = await this.usersService.create(signupUser);

    return userCreated;
  }

  async login({ login, password }: LoginUserDto) {
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Password is incorrect');
    }

    const tokens = await this.createTokens(user.id, user.login);
    const { accessToken, refreshToken } = tokens;

    return { id: user.id, accessToken, refreshToken };
  }

  async refresh(refreshTokenDto: RefreshTokensDto) {
    const { refreshToken } = refreshTokenDto;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const tokens = await this.createTokens(payload.userId, payload.login);

      return tokens;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Refresh token has expired');
      }
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private async generateAccessToken(userId: string, login: string) {
    return this.jwtService.signAsync(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
  }

  private async generateRefreshToken(userId: string, login: string) {
    return this.jwtService.signAsync(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
  }

  private async createTokens(userId: string, login: string) {
    return {
      accessToken: await this.generateAccessToken(userId, login),
      refreshToken: await this.generateRefreshToken(userId, login),
    };
  }
}
