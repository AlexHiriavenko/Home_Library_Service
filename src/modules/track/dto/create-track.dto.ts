import { ApiProperty } from '@nestjs/swagger';
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
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid | null',
    description: 'Unique artist ID',
  })
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
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
}
