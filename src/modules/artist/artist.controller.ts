import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validationPipe } from '../../common/pipes/validation.pipe';
import { ResponseArtistDto } from './dto/respons-artist.dto';
import {
  ApiCreate,
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiUpdate,
} from '../../common/decorators/docApi.decorators';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiCreate('artist', CreateArtistDto, ResponseArtistDto)
  @UsePipes(validationPipe)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiGet('artist', ResponseArtistDto)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiGetById('artist')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiUpdate('artist', UpdateArtistDto, ResponseArtistDto)
  @UsePipes(validationPipe)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiDelete('artist')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
