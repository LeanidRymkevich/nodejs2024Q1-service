import { Module, forwardRef } from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumDB } from './db/in-memory-track.db';
import { FavsModule } from '../favs/favs.module';
import { TrackModule } from '../track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'IAlbumDB',
      useClass: InMemoryAlbumDB,
    },
  ],
  exports: [AlbumService],
  imports: [forwardRef(() => FavsModule), forwardRef(() => TrackModule)],
})
export class AlbumModule {}
