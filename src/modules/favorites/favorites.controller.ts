import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseFavoriteDto } from './dto/response-favorite.dto';
import { ResponseArtistDto } from '../artist/dto/respons-artist.dto';
import { ResponseAlbumDto } from '../album/dto/response-album.dto';
import { ResponseTrackDto } from '../track/dto/response-track.dto';
import {
  ApiAddToFavorites,
  ApiRemoveFromFavorites,
  ApiUUIDParam,
} from '../../common/decorators/docApi.decorators';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'Returns all favorites',
    type: ResponseFavoriteDto,
    schema: {
      example: {
        artists: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'artist name',
            grammy: true,
          },
        ],
        albums: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'album name',
            year: 2023,
            artistId: '123e4567-e89b-12d3-a456-426614174000',
          },
        ],
        tracks: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'track name',
            albumId: '123e4567-e89b-12d3-a456-426614174000',
            artistId: '123e4567-e89b-12d3-a456-426614174000',
            duration: 240,
          },
        ],
      },
    },
  })
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  @ApiAddToFavorites('Add artist to favorites', ResponseArtistDto)
  @ApiUUIDParam('artist')
  addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @ApiUUIDParam('artist')
  @ApiRemoveFromFavorites('Remove artist from favorites')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Post('album/:id')
  @ApiAddToFavorites('Add album to favorites', ResponseAlbumDto)
  @ApiUUIDParam('album')
  addAlbums(@Param('id') id: string) {
    return this.favoritesService.addAlbums(id);
  }

  @Delete('album/:id')
  @ApiRemoveFromFavorites('Remove album from favorites')
  @ApiUUIDParam('album')
  @HttpCode(204)
  removeAlbums(@Param('id') id: string) {
    return this.favoritesService.removeAlbums(id);
  }

  @Post('track/:id')
  @ApiAddToFavorites('Add track to favorites', ResponseTrackDto)
  @ApiUUIDParam('track')
  addTracks(@Param('id') id: string) {
    return this.favoritesService.addTracks(id);
  }

  @Delete('track/:id')
  @ApiRemoveFromFavorites('Remove track from favorites')
  @ApiUUIDParam('track')
  @HttpCode(204)
  removeTracks(@Param('id') id: string) {
    return this.favoritesService.removeTracks(id);
  }
}
