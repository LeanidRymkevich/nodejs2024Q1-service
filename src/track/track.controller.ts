import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateTrackDto): Promise<Track> {
    return this.trackService.create(dto);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    const track: Track | null = await this.trackService.findOne(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: CreateTrackDto
  ): Promise<Track> {
    const track: Track | null = await this.trackService.update(id, dto);
    if (!track) throw new NotFoundException();
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const track: Track | null = await this.trackService.remove(id);
    if (!track) throw new NotFoundException();
  }
}
