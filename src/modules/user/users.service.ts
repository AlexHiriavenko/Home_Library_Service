import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import CreateUserDto from './dto/create.dto';
import UpdateUserPasswordDto from './dto/updateUser.dto';
import { responsUser, User } from 'src/types/types';
import { isUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  private hidePassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private getUserByIdWithPassword(id: string): User | undefined {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. userId is invalid (not uuid)',
      );
    }

    const user = this.database.usersDatabaseService
      .getAll()
      .find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findAll() {
    return this.database.usersDatabaseService
      .getAll()
      .map((user) => this.hidePassword(user));
  }

  findOne(id: string): responsUser {
    const user = this.getUserByIdWithPassword(id);
    return this.hidePassword(user);
  }

  create(createUserDto: CreateUserDto): responsUser {
    const { login, password } = createUserDto;
    const id = uuidv4();
    const user: User = {
      id,
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.hidePassword(this.database.usersDatabaseService.create(user));
  }

  updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): responsUser {
    const currentUser = this.getUserByIdWithPassword(id);

    const { oldPassword, newPassword } = updateUserPasswordDto;

    if (oldPassword !== currentUser.password) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = this.database.usersDatabaseService.update(id, {
      password: newPassword,
      updatedAt: Date.now(),
      version: currentUser.version + 1,
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found for update');
    }

    return this.hidePassword(updatedUser);
  }

  delete(id: string): responsUser {
    const user = this.getUserByIdWithPassword(id);
    this.database.usersDatabaseService.delete(id);
    return this.hidePassword(user);
  }
}
