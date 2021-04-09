import { DriverType, StorageModule } from '@codebrew/nestjs-storage';
import { Module } from '@nestjs/common';
import path from 'path';

import { ApiModule } from './api/api.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ApiModule,
    StorageModule.forRoot({
      default: 'local',
      disks: {
        local: {
          driver: DriverType.LOCAL,
          config: { root: path.join(process.cwd(), 'data', 'uploads') },
        },
      },
    }),
  ],
})
export class AppModule {}
