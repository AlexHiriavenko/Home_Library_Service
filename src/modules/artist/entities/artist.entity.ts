import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class Artist {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    description: 'Unique artist ID',
  })
  @IsNotEmpty()
  id: string;
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
}
