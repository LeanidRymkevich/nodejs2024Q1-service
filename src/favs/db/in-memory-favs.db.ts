import { Favorites } from '../entities/fav.entity';
import { IFavoritesDB } from '../interfaces/favs-db.interface';

export class InMemoryFavoritesDB implements IFavoritesDB {
  private tracks: string[] = [];
  private artists: string[] = [];
  private albums: string[] = [];

  findAll(): Favorites {
    const { tracks, albums, artists } = this;
    return {
      tracks,
      albums,
      artists,
    };
  }

  addTrack(id: string): string {
    return this.addToStore(id, this.tracks);
  }

  deleteTrack(id: string): string | null {
    const initialItemsNum: number = this.tracks.length;
    this.tracks = this.tracks.filter((value: string): boolean => id !== value);

    if (initialItemsNum === this.tracks.length) return null;
    return id;
  }

  addArtist(id: string): string {
    return this.addToStore(id, this.artists);
  }

  deleteArtist(id: string): string {
    const initialItemsNum: number = this.artists.length;
    this.artists = this.artists.filter(
      (value: string): boolean => id !== value
    );

    if (initialItemsNum === this.artists.length) return null;
    return id;
  }

  addAlbum(id: string): string {
    return this.addToStore(id, this.albums);
  }

  deleteAlbum(id: string): string {
    const initialItemsNum: number = this.albums.length;
    this.albums = this.albums.filter((value: string): boolean => id !== value);

    if (initialItemsNum === this.albums.length) return null;
    return id;
  }

  private addToStore(entry: string, store: string[]): string {
    store.push(entry);
    return entry;
  }

  private deleteFromStore(entry: string, store: string[]): string | null {
    const initialItemsNum: number = store.length;
    store = store.filter((value: string): boolean => entry !== value);

    if (initialItemsNum === store.length) return null;
    return entry;
  }
}
