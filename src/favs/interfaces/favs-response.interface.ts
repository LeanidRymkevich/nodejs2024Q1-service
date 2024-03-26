import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

export interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
