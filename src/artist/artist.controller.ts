import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateArtistDto): Promise<Artist> {
    return this.artistService.create(dto);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    const artist: Artist | null = await this.artistService.findOne(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: CreateArtistDto
  ): Promise<Artist> {
    const artist: Artist | null = await this.artistService.update(id, dto);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const artist: Artist | null = await this.artistService.remove(id);
    if (!artist) throw new NotFoundException();
  }
}
