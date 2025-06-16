import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty } from 'class-validator';

class ResponseTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({
    format: 'uuid',
    description: 'Unique track ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Name of the track',
    example: 'Track name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the artist associated with the track',
    example: '123e4567-e89b-12d3-a456-426614174000 | null',
  })
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album associated with the track',
    example: '123e4567-e89b-12d3-a456-426614174000 | null',
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    example: 240,
  })
  duration: number;
}

export { ResponseTrackDto };
