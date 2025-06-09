import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
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
}
