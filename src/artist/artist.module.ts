import { Module } from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistDB } from './db/in-memory-artist.db';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'IArtistDB',
      useClass: InMemoryArtistDB,
    },
  ],
})
export class ArtistModule {}
