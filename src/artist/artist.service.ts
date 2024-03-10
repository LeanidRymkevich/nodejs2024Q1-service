import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { IArtistDB } from './interfaces/artist-db.interface';
import { FavoritesService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('IArtistDB') private storage: IArtistDB,
    @Inject(forwardRef(() => FavoritesService))
    private favsService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumsService: AlbumService
  ) {}

  async create(dto: CreateArtistDto): Promise<Artist | null> {
    return this.storage.create(dto);
  }

  async findAll(): Promise<Artist[]> {
    return this.storage.findAll();
  }

  async findOne(id: string): Promise<Artist | null> {
    return this.storage.findOne(id);
  }

  async update(id: string, dto: CreateArtistDto): Promise<Artist | null> {
    return this.storage.update(id, dto);
  }

  async remove(id: string): Promise<Artist | null> {
    const track: Track | null = await this.tracksService.getByAlbumId(id);
    const album: Album | null = await this.albumsService.getByArtistId(id);

    if (track) {
      const { name, duration, artistId } = track;
      this.tracksService.update(id, {
        name,
        artistId,
        albumId: null,
        duration,
      });
    }

    if (album) {
      const { id, name, year } = album;
      this.albumsService.update(id, {
        name,
        year,
        artistId: null,
      });
    }
    await this.favsService.deleteArtist(id);
    return this.storage.remove(id);
  }
}
