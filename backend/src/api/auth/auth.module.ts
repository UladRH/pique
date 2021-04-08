import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HashingProvider } from '../shared/crypto/hashing.provider';
import { ProfilesModule } from '../profiles/profiles.module';
import { AuthService } from './auth.service';
import { WebSessionService } from './web-auth/web-session.service';
import { UserController } from './user.controller';
import { WebAuthController } from './web-auth/web-auth.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [ProfilesModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController, WebAuthController],
  providers: [AuthService, WebSessionService, HashingProvider],
  exports: [AuthService, WebSessionService],
})
export class AuthModule {}
