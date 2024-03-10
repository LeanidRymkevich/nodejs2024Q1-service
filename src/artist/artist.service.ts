import { Inject, Injectable } from '@nestjs/common';

import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';
import { IArtistDB } from './interfaces/artist-db.interface';

@Injectable()
export class ArtistService {
  constructor(@Inject('IArtistDB') private storage: IArtistDB) {}

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
    return this.storage.remove(id);
  }
}
