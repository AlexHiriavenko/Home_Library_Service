import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @MinLength(4, { message: 'The password must contain at least 4 characters' })
  @MaxLength(20, { message: 'The password must not exceed 20 characters' })
  password: string;
}
export default CreateUserDto;
