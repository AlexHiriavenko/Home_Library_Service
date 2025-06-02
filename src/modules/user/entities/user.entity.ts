import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    format: 'uuid',
    description: 'Unique user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: "User's login",
    example: 'Vasia',
  })
  login: string;

  @ApiProperty({
    description: 'user password',
    example: 'password_123',
  })
  password: string;

  @ApiProperty({ description: 'User Account version', example: 1 })
  version: number;

  @ApiProperty({
    description: 'Date the record was created',
    example: 1672531199000,
  })
  createdAt: number;

  @ApiProperty({
    description: 'The date of the last update of the record',
    example: 1672531299000,
  })
  updatedAt: number;
}
