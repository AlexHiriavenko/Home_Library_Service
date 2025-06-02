import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class UpdateUserPasswordDto {
  @ApiProperty({ example: 'password123', description: 'user oldpassword' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'password123', description: 'user newpassword' })
  @IsString()
  @MinLength(4, { message: 'The password must contain at least 4 characters' })
  @MaxLength(20, { message: 'The password must not exceed 20 characters' })
  newPassword: string;
}

export default UpdateUserPasswordDto;
