import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'track name', description: 'track name' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    example: null,
    format: 'uuid | null',
    description: 'Unique artist ID',
  })
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  @ApiProperty({
    example: null,
    format: 'uuid | null',
    description: 'Unique album ID',
  })
  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Album

  @ApiProperty({ example: 240, description: 'track duration' })
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  duration: number; // integer number

  @Exclude()
  favorite: boolean;
}
