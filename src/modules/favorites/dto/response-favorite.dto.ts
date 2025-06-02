import { ResponseTrackDto } from '../../track/dto/response-track.dto';
import { ResponseAlbumDto } from '../../album/dto/response-album.dto';
import { ResponseArtistDto } from '../../artist/dto/respons-artist.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFavoriteDto {
  @ApiProperty({
    description: 'Favorite artists ids',
    type: [ResponseArtistDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'artist name',
        grammy: true,
      },
    ],
  })
  artists: ResponseArtistDto[];

  @ApiProperty({
    description: 'Favorite albums ids',
    type: [ResponseAlbumDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'album name',
        year: 2023,
        artistId: '123e4567-e89b-12d3-a456-426614174000',
      },
    ],
  })
  albums: ResponseAlbumDto[];

  @ApiProperty({
    description: 'Favorite tracks ids',
    type: [ResponseTrackDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'track name',
        artistId: '123e4567-e89b-12d3-a456-426614174000',
        albumId: '123e4567-e89b-12d3-a456-426614174000',
        duration: 240,
      },
    ],
  })
  tracks: ResponseTrackDto[];
}
