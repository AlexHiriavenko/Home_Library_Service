import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from '../../database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
@Injectable()
export class AlbumService {
  constructor(private readonly db: DatabaseService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    const newAlbum = this.db.albumDatabaseService.create(album);
    return newAlbum;
  }

  findAll() {
    return this.db.albumDatabaseService.findAll();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. albumId is invalid (not uuid)',
      );
    }
    const album = this.db.albumDatabaseService.findOne(id);
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    this.findOne(id);

    const updatedAlbum = this.db.albumDatabaseService.update(
      id,
      updateAlbumDto,
    );

    return { id, ...updatedAlbum };
  }

  remove(id: string) {
    this.findOne(id);
    return this.db.albumDatabaseService.remove(id);
  }
}
