import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';

export class Track {
  @ApiProperty({
    format: 'uuid',
    description: 'Unique track ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4')
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Name of the track',
    example: 'Track name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID of the artist associated with the track',
    example: '123e4567-e89b-12d3-a456-426614174000 | null',
    nullable: true,
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album associated with the track',
    example: '123e4567-e89b-12d3-a456-426614174000 | null',
    nullable: true,
  })
  @ValidateIf((_, value) => value !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    example: 240,
  })
  duration: number;
}
