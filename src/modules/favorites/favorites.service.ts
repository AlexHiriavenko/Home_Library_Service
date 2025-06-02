import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

import { DatabaseService } from '../../database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DatabaseService) {}

  getAllFavorites() {
    return this.db.favoritesDatabaseService.getAllFavorites();
  }

  addArtist(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    const artist = this.db.artistDatabaseService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    return this.db.favoritesDatabaseService.addArtist(artist);
  }

  removeArtist(id: string) {
    return this.db.favoritesDatabaseService.removeArtist(id);
  }

  addAlbums(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. albumId is invalid (not uuid)',
      );
    }
    const album = this.db.albumDatabaseService.findOne(id);
    if (!album) {
      throw new UnprocessableEntityException(`Album not found`);
    }
    return this.db.favoritesDatabaseService.addAlbum(album);
  }

  removeAlbums(id: string) {
    return this.db.favoritesDatabaseService.removeAlbum(id);
  }

  addTracks(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. trackId is invalid (not uuid)',
      );
    }
    const track = this.db.trackDatabaseService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    return this.db.favoritesDatabaseService.addTrack(track);
  }

  removeTracks(id: string) {
    return this.db.favoritesDatabaseService.removeTrack(id);
  }
}
