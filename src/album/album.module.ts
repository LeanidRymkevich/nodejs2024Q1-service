import { Module } from '@nestjs/common';

import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryAlbumDB } from './db/in-memory-track.db';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'IAlbumDB',
      useClass: InMemoryAlbumDB,
    },
  ],
  exports: [AlbumModule],
})
export class AlbumModule {}
