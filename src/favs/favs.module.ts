import { Module } from '@nestjs/common';

import { FavoritesService } from './favs.service';
import { FavsController } from './favs.controller';
import { InMemoryFavoritesDB } from './db/in-memory-favs.db';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [
    FavoritesService,
    {
      provide: 'IFavoritesDB',
      useClass: InMemoryFavoritesDB,
    },
  ],
  imports: [TrackModule, AlbumModule, ArtistModule],
})
export class FavsModule {}
