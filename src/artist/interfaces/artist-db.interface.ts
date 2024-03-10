import { CreateArtistDto } from '../dto/create-artist.dto';
import { Artist } from '../entities/artist.entity';

export interface IArtistDB {
  findAll(): Promise<Artist[]> | Artist[];
  findOne(id: string): Promise<Artist | null> | Artist | null;
  create(dto: CreateArtistDto): Promise<Artist | null> | Artist;
  update(
    id: string,
    dto: CreateArtistDto
  ): Promise<Artist | null> | Artist | null;
  remove(id: string): Promise<Artist | null> | Artist | null;
}
