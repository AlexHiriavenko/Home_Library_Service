import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  HttpCode,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validationPipe } from '../../common/pipes/validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ResponseAlbumDto } from './dto/response-album.dto';
import {
  ApiCreate,
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiUpdate,
} from '../../common/decorators/docApi.decorators';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiCreate('album', CreateAlbumDto, ResponseAlbumDto)
  @UsePipes(validationPipe)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiGet('album', ResponseAlbumDto)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiGetById('album')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiUpdate('album', UpdateAlbumDto, ResponseAlbumDto)
  @UsePipes(validationPipe)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiDelete('album')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
