import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';

import { DataBaseModule } from '../../database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
