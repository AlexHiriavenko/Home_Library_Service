import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { DatabaseService } from '../../database/database.service';
import { isUUID } from 'class-validator';
@Injectable()
export class ArtistService {
  constructor(private readonly database: DatabaseService) {}
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    const newArtist = this.database.artistDatabaseService.create(artist);
    return newArtist;
  }

  findAll() {
    return this.database.artistDatabaseService.findAll();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. userId is invalid (not uuid)',
      );
    }
    const artist = this.database.artistDatabaseService.findOne(id);
    if (!artist) {
      throw new NotFoundException('artist not found');
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    this.findOne(id);
    const updateArtist = this.database.artistDatabaseService.update(
      id,
      updateArtistDto,
    );
    return { id, ...updateArtist };
  }

  remove(id: string) {
    const artist = this.findOne(id);

    if (!artist) {
      return null;
    }

    return this.database.artistDatabaseService.remove(id);
  }
}
