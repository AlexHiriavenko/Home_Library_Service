import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';
import { IsNotEmpty } from 'class-validator';

class ResponseArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    description: 'Unique artist ID',
  })
  @IsNotEmpty()
  id: string;
}

export { ResponseArtistDto };
