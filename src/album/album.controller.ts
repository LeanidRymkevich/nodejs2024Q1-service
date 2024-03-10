import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body(ValidationPipe) dto: CreateAlbumDto): Promise<Album> {
    return this.albumService.create(dto);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    const album: Album | null = await this.albumService.findOne(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: CreateAlbumDto
  ): Promise<Album> {
    const album: Album | null = await this.albumService.update(id, dto);
    if (!album) throw new NotFoundException();
    return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const album: Album | null = await this.albumService.remove(id);
    if (!album) throw new NotFoundException();
  }
}
