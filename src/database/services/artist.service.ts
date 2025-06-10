import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UpdateArtistDto } from 'src/modules/artist/dto/update-artist.dto';
import { Artist } from 'src/types/types';
import { TrackDatabaseService } from './track.service';
import { AlbumDatabaseService } from './album.service';
import { FavoritesDatabaseService } from './favorites.service';

@Injectable()
export class ArtistDatabaseService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => TrackDatabaseService))
    public readonly trackDatabaseService: TrackDatabaseService,

    @Inject(forwardRef(() => AlbumDatabaseService))
    public readonly albumDatabaseService: AlbumDatabaseService,

    @Inject(forwardRef(() => FavoritesDatabaseService))
    public readonly favoritesDatabaseService: FavoritesDatabaseService,
  ) {}

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(artist: Artist) {
    this.artists.push(artist);
    return artist;
  }

  update(id: string, artist: UpdateArtistDto) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    const updatedArtist = { ...this.artists[index], ...artist };
    this.artists[index] = updatedArtist;
    return artist;
  }

  remove(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
    const tracks = this.trackDatabaseService.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        this.trackDatabaseService.update(track.id, { artistId: null });
      }
    });
    const albums = this.albumDatabaseService.findAll();
    albums.forEach((album) => {
      if (album.artistId === id) {
        this.albumDatabaseService.update(album.id, { artistId: null });
      }
    });

    this.favoritesDatabaseService.removeArtist(id);
  }
}
