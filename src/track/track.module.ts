import { Module, forwardRef } from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackDB } from './db/in-memory-track.db';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'ITrackDB',
      useClass: InMemoryTrackDB,
    },
  ],
  exports: [TrackService],
  imports: [forwardRef(() => FavsModule)],
})
export class TrackModule {}
