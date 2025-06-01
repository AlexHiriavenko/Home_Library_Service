import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UserDatabaseService } from './services/user.service';

@Module({
  providers: [DatabaseService, UserDatabaseService],
  exports: [DatabaseService, UserDatabaseService],
})
export class DataBaseModule {}
