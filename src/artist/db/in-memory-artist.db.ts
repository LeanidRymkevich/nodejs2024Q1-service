import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { IArtistDB } from '../interfaces/artist-db.interface';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class InMemoryArtistDB implements IArtistDB {
  private readonly storage: Record<string, Artist> = {};

  findAll(): Artist[] {
    return Object.values(this.storage);
  }

  findOne(id: string): Artist | null {
    return this.storage[id] || null;
  }

  create(dto: CreateArtistDto): Artist {
    const id: string = randomUUID();

    const track: Artist = {
      id,
      ...dto,
    };

    this.storage[id] = track;
    return track;
  }

  update(id: string, dto: CreateArtistDto): Artist | null {
    const track: Artist | null = this.findOne(id);

    if (!track) return null;

    this.storage[id] = {
      id,
      ...dto,
    };
    return this.storage[id];
  }

  remove(id: string): Artist | null {
    const track: Artist | null = this.findOne(id);

    if (track) delete this.storage[id];
    return track;
  }
}
