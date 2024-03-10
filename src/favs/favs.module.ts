import { Module } from '@nestjs/common';

import { FavoritesService } from './favs.service';
import { FavsController } from './favs.controller';
import { InMemoryFavoritesDB } from './db/in-memory-favs.db';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavoritesService,
    {
      provide: 'IFavoritesDB',
      useClass: InMemoryFavoritesDB,
    },
  ],
  imports: [TrackService, AlbumService, ArtistService],
})
export class FavsModule {}
