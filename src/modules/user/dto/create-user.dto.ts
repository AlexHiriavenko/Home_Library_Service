import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateUserDto {
  @ApiProperty({
    example: 'user123',
    description: 'user login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'password123',
    description: 'user password',
    minLength: 4,
    maxLength: 20,
  })
  @IsString()
  @MinLength(4, { message: 'The password must contain at least 4 characters' })
  @MaxLength(20, { message: 'The password must not exceed 20 characters' })
  password: string;
}
export default CreateUserDto;
