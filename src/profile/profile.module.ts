import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './profile.entity';
import { BrickModule } from '@/brick/brick.module';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity]), BrickModule, UserModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
