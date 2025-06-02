import { Injectable } from '@nestjs/common';
import { User } from 'src/types/types';

@Injectable()
export class UserDatabaseService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: string, updatedUser: Partial<User>): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;

    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return this.users[userIndex];
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
