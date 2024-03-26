import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { IAlbumDB } from './interfaces/album-db.interface';
import { Album } from './entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { FavoritesService } from '../favs/favs.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('IAlbumDB') private storage: IAlbumDB,
    @Inject(forwardRef(() => FavoritesService))
    private favsService: FavoritesService,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService
  ) {}

  async create(dto: CreateAlbumDto): Promise<Album | null> {
    return this.storage.create(dto);
  }

  async findAll(): Promise<Album[]> {
    return this.storage.findAll();
  }

  async findOne(id: string): Promise<Album | null> {
    return this.storage.findOne(id);
  }

  async update(id: string, dto: CreateAlbumDto): Promise<Album | null> {
    return this.storage.update(id, dto);
  }

  async remove(id: string): Promise<Album | null> {
    const track: Track | null = await this.tracksService.getByAlbumId(id);
    if (track) {
      const { name, duration, artistId, id } = track;
      this.tracksService.update(id, {
        name,
        artistId,
        albumId: null,
        duration,
      });
    }
    await this.favsService.deleteAlbum(id);
    return this.storage.remove(id);
  }

  async getByArtistId(id: string): Promise<Album | null> {
    return this.storage.getByArtistId(id);
  }
}
