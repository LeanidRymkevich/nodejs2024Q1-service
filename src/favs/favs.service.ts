import { Inject, Injectable } from '@nestjs/common';

import { IFavoritesDB } from './interfaces/favs-db.interface';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { Favorites } from './entities/fav.entity';
import { IFavoritesResponse } from './interfaces/favs-response.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('IFavoritesDB') private storage: IFavoritesDB,
    private albumService: AlbumService,
    private trackService: TrackService,
    private artistService: ArtistService
  ) {}

  async findAll(): Promise<IFavoritesResponse> {
    const {
      tracks: tracksIds,
      albums: albumsIds,
      artists: artistsIds,
    }: Favorites = await this.storage.findAll();

    const tracks: Track[] = (
      await Promise.all(
        tracksIds.map(
          (id: string): Promise<Track> => this.trackService.findOne(id)
        )
      )
    ).filter((item: Track | null): boolean => item !== null);

    const albums: Album[] = (
      await Promise.all(
        albumsIds.map(
          (id: string): Promise<Album> => this.albumService.findOne(id)
        )
      )
    ).filter((item: Album | null): boolean => item !== null);

    const artists: Artist[] = (
      await Promise.all(
        artistsIds.map(
          (id: string): Promise<Artist> => this.artistService.findOne(id)
        )
      )
    ).filter((item: Artist | null): boolean => item !== null);

    return {
      tracks,
      artists,
      albums,
    };
  }

  async addTrack(id: string): Promise<Track | null> {
    const track: Track | null = await this.trackService.findOne(id);
    if (track) this.storage.addTrack(id);

    return track;
  }

  async deleteTrack(id: string): Promise<Track | null> {
    const track: Track | null = await this.trackService.findOne(id);
    if (!track) return track;

    const deleteResult: string | null = this.storage.deleteTrack(id);
    if (!deleteResult) return null;

    return track;
  }

  async addArtist(id: string): Promise<Artist | null> {
    const artist: Artist | null = await this.artistService.findOne(id);
    if (artist) this.storage.addArtist(id);

    return artist;
  }

  async deleteArtist(id: string): Promise<Artist | null> {
    const artist: Artist | null = await this.artistService.findOne(id);
    if (!artist) return artist;

    const deleteResult: string | null = this.storage.deleteArtist(id);
    if (!deleteResult) return null;

    return artist;
  }

  async addAlbum(id: string): Promise<Album | null> {
    const album: Album | null = await this.albumService.findOne(id);
    if (album) this.storage.addAlbum(id);

    return album;
  }

  async deleteAlbum(id: string): Promise<Album | null> {
    const album: Album | null = await this.albumService.findOne(id);
    if (!album) return album;

    const deleteResult: string | null = this.storage.deleteAlbum(id);
    if (!deleteResult) return null;

    return album;
  }
}
