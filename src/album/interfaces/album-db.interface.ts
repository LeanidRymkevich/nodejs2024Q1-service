import { CreateAlbumDto } from '../dto/create-album.dto';
import { Album } from '../entities/album.entity';

export interface IAlbumDB {
  findAll(): Promise<Album[]> | Album[];
  findOne(id: string): Promise<Album | null> | Album;
  create(dto: CreateAlbumDto): Promise<Album | null> | Album;
  update(id: string, dto: CreateAlbumDto): Promise<Album | null> | Album;
  remove(id: string): Promise<Album | null> | Album;
}
