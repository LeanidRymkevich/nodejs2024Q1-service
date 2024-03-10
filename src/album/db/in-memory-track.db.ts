import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';
import { IAlbumDB } from '../interfaces/album-db.interface';

@Injectable()
export class InMemoryAlbumDB implements IAlbumDB {
  private readonly storage: Record<string, Album> = {};

  findAll(): Album[] {
    return Object.values(this.storage);
  }

  findOne(id: string): Album | null {
    return this.storage[id] || null;
  }

  create(dto: CreateAlbumDto): Album {
    const id: string = randomUUID();

    const track: Album = {
      id,
      ...dto,
    };

    this.storage[id] = track;
    return track;
  }

  update(id: string, dto: CreateAlbumDto): Album | null {
    const track: Album | null = this.findOne(id);

    if (!track) return null;

    this.storage[id] = {
      id,
      ...dto,
    };
    return this.storage[id];
  }

  remove(id: string): Album | null {
    const track: Album | null = this.findOne(id);

    if (track) delete this.storage[id];
    return track;
  }
}
