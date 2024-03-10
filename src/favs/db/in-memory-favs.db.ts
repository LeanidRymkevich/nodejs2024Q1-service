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
    return this.deleteFromStore(id, this.tracks);
  }

  addArtist(id: string): string {
    return this.addToStore(id, this.artists);
  }

  deleteArtist(id: string): string {
    return this.deleteFromStore(id, this.artists);
  }

  addAlbum(id: string): string {
    return this.addToStore(id, this.albums);
  }

  deleteAlbum(id: string): string {
    return this.deleteFromStore(id, this.albums);
  }

  private addToStore(entry: string, store: string[]): string {
    store.push(entry);
    return entry;
  }

  private deleteFromStore(entry: string, store: string[]): string | null {
    const oldStore: string[] = store;
    store = oldStore.filter((value: string): boolean => entry !== value);

    if (oldStore.length === store.length) return null;
    return entry;
  }
}
