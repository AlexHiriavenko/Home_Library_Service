import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataBaseModule } from '../../database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
