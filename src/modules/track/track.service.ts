import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from '../../database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    const newTrack = this.db.trackDatabaseService.create(track);
    return newTrack;
  }

  findAll() {
    return this.db.trackDatabaseService.findAll();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. trackId is invalid (not uuid)',
      );
    }
    const track = this.db.trackDatabaseService.findOne(id);
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    this.findOne(id);

    const updatedTrack = this.db.trackDatabaseService.update(
      id,
      updateTrackDto,
    );
    return { id, ...updatedTrack };
  }

  remove(id: string) {
    const track = this.findOne(id);
    if (!track) {
      return null;
    }
    return this.db.trackDatabaseService.remove(id);
  }
}
