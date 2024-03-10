import { Inject, Injectable } from '@nestjs/common';

import { CreateTrackDto } from './dto/create-track.dto';
import { ITrackDB } from './interfaces/track-db.interface';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(@Inject('ITrackDB') private storage: ITrackDB) {}

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
    return this.storage.remove(id);
  }
}
