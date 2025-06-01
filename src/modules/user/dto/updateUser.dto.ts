import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @MinLength(4, { message: 'The password must contain at least 4 characters' })
  @MaxLength(20, { message: 'The password must not exceed 20 characters' })
  newPassword: string;
}

export default UpdateUserPasswordDto;
