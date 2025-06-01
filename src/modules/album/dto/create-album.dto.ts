import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
