import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validationPipe } from '../../common/pipes/validation.pipe';
import { ApiTags } from '@nestjs/swagger';
import { ResponseTrackDto } from './dto/response-track.dto';
import {
  ApiCreate,
  ApiDelete,
  ApiGet,
  ApiGetById,
  ApiUpdate,
} from '../../common/decorators/docApi.decorators';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiCreate('track', CreateTrackDto, ResponseTrackDto)
  @UsePipes(validationPipe)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiGet('track', ResponseTrackDto)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiGetById('track')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiUpdate('track', UpdateTrackDto, ResponseTrackDto)
  @UsePipes(validationPipe)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiDelete('track')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
