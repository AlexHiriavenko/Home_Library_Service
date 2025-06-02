import { Injectable } from '@nestjs/common';
import { Album, Artist, Track } from 'src/types/types';

@Injectable()
export class FavoritesDatabaseService {
  private favoriteTracks: Track[] = [];
  private favoriteAlbums: Album[] = [];
  private favoriteArtists: Artist[] = [];

  getAllFavorites() {
    return {
      artists: this.favoriteArtists,
      albums: this.favoriteAlbums,
      tracks: this.favoriteTracks,
    };
  }

  addArtist(artist: Artist) {
    if (!this.favoriteArtists.includes(artist)) {
      this.favoriteArtists.push(artist);
    }
    return artist;
  }

  removeArtist(id: string) {
    this.favoriteArtists = this.favoriteArtists.filter((a) => a.id !== id);
  }

  addAlbum(album: Album) {
    if (!this.favoriteAlbums.includes(album)) {
      this.favoriteAlbums.push(album);
    }

    return album;
  }

  removeAlbum(id: string) {
    this.favoriteAlbums = this.favoriteAlbums.filter((a) => a.id !== id);
  }

  addTrack(track: Track) {
    if (!this.favoriteTracks.includes(track)) {
      this.favoriteTracks.push(track);
    }
    return track;
  }

  removeTrack(id: string) {
    this.favoriteTracks = this.favoriteTracks.filter((t) => t.id !== id);
  }
}
