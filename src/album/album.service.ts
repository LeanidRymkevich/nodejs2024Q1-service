import { Inject, Injectable } from '@nestjs/common';

import { CreateAlbumDto } from './dto/create-album.dto';
import { IAlbumDB } from './interfaces/album-db.interface';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(@Inject('IAlbumDB') private storage: IAlbumDB) {}

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
    return this.storage.remove(id);
  }
}
