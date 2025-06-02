import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DataBaseModule } from '../../database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
