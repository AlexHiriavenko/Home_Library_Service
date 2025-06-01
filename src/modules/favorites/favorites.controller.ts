import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Post('album/:id')
  addAlbums(@Param('id') id: string) {
    return this.favoritesService.addAlbums(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbums(@Param('id') id: string) {
    return this.favoritesService.removeAlbums(id);
  }

  @Post('track/:id')
  addTracks(@Param('id') id: string) {
    return this.favoritesService.addTracks(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTracks(@Param('id') id: string) {
    return this.favoritesService.removeTracks(id);
  }
}
