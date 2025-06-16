import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorites() {
    const [albums, artists, tracks] = await this.prisma.$transaction([
      this.prisma.album.findMany({ where: { favorite: true } }),
      this.prisma.artist.findMany({ where: { favorite: true } }),
      this.prisma.track.findMany({ where: { favorite: true } }),
    ]);

    const favoriteArtists = artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    }));

    const favoriteAlbums = albums.map((album) => ({
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    }));

    const favoriteTracks = tracks.map((track) => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      artistId: track.artistId,
      albumId: track.albumId,
    }));

    return {
      artists: favoriteArtists,
      albums: favoriteAlbums,
      tracks: favoriteTracks,
    };
  }

  async addArtist(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. artistId is invalid (not uuid)',
      );
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    await this.prisma.artist.update({
      where: { id },
      data: { favorite: true },
    });

    return {
      id: artist.id,
      name: artist.name,
      grammy: artist.grammy,
    };
  }

  async removeArtist(id: string) {
    const artist = await this.prisma.artist.update({
      where: { id },
      data: { favorite: false },
    });
    return artist;
  }

  async addAlbums(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. albumId is invalid (not uuid)',
      );
    }
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException(`Album not found`);
    }
    await this.prisma.album.update({
      where: { id },
      data: { favorite: true },
    });

    return {
      id: album.id,
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    };
  }

  async removeAlbums(id: string) {
    return await this.prisma.album.update({
      where: { id },
      data: { favorite: false },
    });
  }

  async addTracks(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        'Bad request. trackId is invalid (not uuid)',
      );
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.prisma.track.update({
      where: { id },
      data: { favorite: true },
    });

    return {
      id: track.id,
      name: track.name,
      duration: track.duration,
      artistId: track.artistId,
      albumId: track.albumId,
    };
  }

  async removeTracks(id: string) {
    return await this.prisma.track.update({
      where: { id },
      data: { favorite: false },
    });
  }
}
