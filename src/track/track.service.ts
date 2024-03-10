import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { ITrackDB } from './interfaces/track-db.interface';
import { Track } from './entities/track.entity';
import { FavoritesService } from 'src/favs/favs.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject('ITrackDB') private storage: ITrackDB,
    @Inject(forwardRef(() => FavoritesService))
    private favsService: FavoritesService
  ) {}

  async create(dto: CreateTrackDto): Promise<Track | null> {
    return this.storage.create(dto);
  }

  async findAll(): Promise<Track[]> {
    return this.storage.findAll();
  }

  async findOne(id: string): Promise<Track | null> {
    return this.storage.findOne(id);
  }

  async update(id: string, dto: CreateTrackDto): Promise<Track | null> {
    return this.storage.update(id, dto);
  }

  async remove(id: string): Promise<Track | null> {
    await this.favsService.deleteTrack(id);
    return this.storage.remove(id);
  }

  async getByAlbumId(id: string): Promise<Track | null> {
    return this.storage.getByAlbumId(id);
  }

  async getByArtistId(id: string): Promise<Track | null> {
    return this.storage.getByArtistId(id);
  }
}
