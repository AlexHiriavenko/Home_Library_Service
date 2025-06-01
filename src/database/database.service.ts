import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserDatabaseService } from './services/user.service';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(forwardRef(() => UserDatabaseService))
    public readonly usersService: UserDatabaseService,
  ) {}
}
