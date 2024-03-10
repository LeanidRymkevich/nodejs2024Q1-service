import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UnprocessableEntityException,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';

import { FavoritesService } from './favs.service';
import { IFavoritesResponse } from './interfaces/favs-response.interface';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavoritesService) {}

  @Get()
  async findAll(): Promise<IFavoritesResponse> {
    return this.favsService.findAll();
  }

  @Post('/track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string): Promise<Track> {
    const track: Track | null = await this.favsService.addTrack(id);
    if (!track) throw new UnprocessableEntityException();
    return track;
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const track: Track | null = await this.favsService.deleteTrack(id);
    if (!track) throw new NotFoundException();
  }

  @Post('/artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    const artist: Artist | null = await this.favsService.addArtist(id);
    if (!artist) throw new UnprocessableEntityException();
    return artist;
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const artist: Artist | null = await this.favsService.deleteArtist(id);
    if (!artist) throw new NotFoundException();
  }

  @Post('/album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    const album: Album | null = await this.favsService.addAlbum(id);
    if (!album) throw new UnprocessableEntityException();
    return album;
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const album: Album | null = await this.favsService.deleteAlbum(id);
    if (!album) throw new NotFoundException();
  }
}
