import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { ITrackDB } from '../interfaces/track-db.interface';
import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';

@Injectable()
export class InMemoryTrackDB implements ITrackDB {
  private readonly storage: Record<string, Track> = {};

  findAll(): Track[] {
    return Object.values(this.storage);
  }

  findOne(id: string): Track | null {
    return this.storage[id] || null;
  }

  create(dto: CreateTrackDto): Track {
    const id: string = randomUUID();

    const track: Track = {
      id,
      ...dto,
    };

    this.storage[id] = track;
    return track;
  }

  update(id: string, dto: CreateTrackDto): Track | null {
    const track: Track | null = this.findOne(id);

    if (!track) return null;

    this.storage[id] = {
      id,
      ...dto,
    };
    return this.storage[id];
  }

  remove(id: string): Track | null {
    const track: Track | null = this.findOne(id);

    if (track) delete this.storage[id];
    return track;
  }
}
