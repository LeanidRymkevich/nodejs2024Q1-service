import { Favorites } from '../entities/fav.entity';

export interface IFavoritesDB {
  findAll(): Promise<Favorites> | Favorites;
  addTrack(id: string): string;
  deleteTrack(id: string): string | null;
  addArtist(id: string): string;
  deleteArtist(id: string): string | null;
  addAlbum(id: string): string;
  deleteAlbum(id: string): string | null;
}
