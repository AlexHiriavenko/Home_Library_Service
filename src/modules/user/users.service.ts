import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserPasswordDto from './dto/update-user.dto';
import { isUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private hidePassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private async getUserByIdWithPassword(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. userId is invalid (not uuid)',
      );
    }

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private toTimestamp(user: any) {
    return {
      ...this.hidePassword(user),
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.toTimestamp(user));
  }

  async findOne(id: string) {
    const user = await this.getUserByIdWithPassword(id);
    return this.toTimestamp(user);
  }

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const id = uuidv4();
    const userCreateInput = {
      id,
      login,
      password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await this.prisma.user.create({
      data: userCreateInput,
    });

    return this.toTimestamp(user);
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const currentUser = await this.getUserByIdWithPassword(id);

    const { oldPassword, newPassword } = updateUserPasswordDto;

    if (oldPassword !== currentUser.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        updatedAt: new Date(),
        version: currentUser.version + 1,
      },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found for update');
    }

    return this.toTimestamp(updatedUser);
  }

  async delete(id: string) {
    const user = await this.getUserByIdWithPassword(id);
    await this.prisma.user.delete({ where: { id } });
    return this.toTimestamp(user);
  }
}
