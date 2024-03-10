import { Module } from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackDB } from './db/in-memory-track.db';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'ITrackDB',
      useClass: InMemoryTrackDB,
    },
  ],
  exports: [TrackModule],
})
export class TrackModule {}
