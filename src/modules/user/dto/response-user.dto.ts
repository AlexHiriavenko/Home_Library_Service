import { ApiProperty } from '@nestjs/swagger';

class ResponseUserDto {
  @ApiProperty({ format: 'uuid', description: 'Unique user ID' })
  id: string;
  @ApiProperty({ description: "User's login" })
  login: string;
  @ApiProperty({ description: 'version', example: 1 })
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

export default ResponseUserDto;
