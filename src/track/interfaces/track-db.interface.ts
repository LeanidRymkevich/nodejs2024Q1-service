import { CreateTrackDto } from '../dto/create-track.dto';
import { Track } from '../entities/track.entity';

export interface ITrackDB {
  findAll(): Promise<Track[]> | Track[];
  findOne(id: string): Promise<Track | null> | Track;
  create(dto: CreateTrackDto): Promise<Track | null> | Track;
  update(id: string, dto: CreateTrackDto): Promise<Track | null> | Track;
  remove(id: string): Promise<Track | null> | Track;
}
