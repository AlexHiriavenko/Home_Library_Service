import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class User {
  @ApiProperty({
    format: 'uuid',
    description: 'Unique user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'user123',
    description: 'user login',
  })
  login: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'user password',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @MinLength(4, { message: 'The password must contain at least 4 characters' })
  @MaxLength(20, { message: 'The password must not exceed 20 characters' })
  @Exclude()
  password: string;

  @ApiProperty({ description: 'User Account version', example: 1 })
  version: number;

  @ApiProperty({
    description: 'Date the record was created',
    example: 1672531199000,
  })
  @IsNumber()
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number;

  @ApiProperty({
    description: 'The date of the last update of the record',
    example: 1672531299000,
  })
  @IsNumber()
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number;
}
