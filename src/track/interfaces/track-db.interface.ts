import { CreateTrackDto } from '../dto/create-track.dto';
import { Track } from '../entities/track.entity';

export interface ITrackDB {
  findAll(): Promise<Track[]> | Track[];
  findOne(id: string): Promise<Track | null> | Track | null;
  create(dto: CreateTrackDto): Promise<Track | null> | Track | null;
  update(id: string, dto: CreateTrackDto): Promise<Track | null> | Track | null;
  remove(id: string): Promise<Track | null> | Track | null;
}
