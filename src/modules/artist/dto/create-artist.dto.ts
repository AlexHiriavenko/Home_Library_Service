import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  @IsDefined()
  grammy: boolean;
}
