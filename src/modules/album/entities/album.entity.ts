import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ResponseAlbumDto } from '../dto/response-album.dto';

export class Album {
  @ApiProperty({
    format: 'uuid',
    description: 'Unique album ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Name of the album', example: 'Album name' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({ description: 'Year of the album', example: 2023 })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  year: number;

  @ApiProperty({
    description: 'ID of the artist associated with the album',
    example: null,
  })
  @IsString()
  @IsOptional()
  artistId: string | null;

  @Exclude()
  favorite: boolean;

  constructor(partial: Partial<ResponseAlbumDto>) {
    Object.assign(this, partial);
  }
}
