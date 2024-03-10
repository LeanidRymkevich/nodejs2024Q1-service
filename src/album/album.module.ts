import { Module, forwardRef } from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumDB } from './db/in-memory-track.db';
import { FavsModule } from '../favs/favs.module';

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
  imports: [forwardRef(() => FavsModule)],
})
export class AlbumModule {}
