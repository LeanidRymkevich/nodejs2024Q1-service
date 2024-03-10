import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  create(dto: CreateTrackDto) {
    return 'This action adds a new track';
  }

  findAll() {
    return `This action returns all track`;
  }

  findOne(id: string) {
    return `This action returns a #${id} track`;
  }

  update(id: string, dto: CreateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    return `This action removes a #${id} track`;
  }
}
