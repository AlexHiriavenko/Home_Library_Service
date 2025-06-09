import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'artist123', description: 'artist name' })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    example: 'true',
    description: 'artist grammy',
  })
  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  grammy: boolean;

  @Exclude()
  favorite: boolean;
}
