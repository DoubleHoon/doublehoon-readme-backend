import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ProfileRepository } from '@/profile/profile.repository';
import { ProfileService } from '@/profile/profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ProfileRepository],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
