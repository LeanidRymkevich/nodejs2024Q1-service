import { Module, forwardRef } from '@nestjs/common';

import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryArtistDB } from './db/in-memory-artist.db';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'IArtistDB',
      useClass: InMemoryArtistDB,
    },
  ],
  exports: [ArtistService],
  imports: [forwardRef(() => FavsModule)],
})
export class ArtistModule {}
