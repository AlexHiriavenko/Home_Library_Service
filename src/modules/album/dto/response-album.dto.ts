import { PartialType } from '@nestjs/mapped-types';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseAlbumDto extends PartialType(CreateAlbumDto) {
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
    example: '123e4567-e89b-12d3-a456-426614174000 | null',
  })
  @IsString()
  @IsOptional()
  artistId: string | null;
}
