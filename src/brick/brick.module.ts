import { Module } from '@nestjs/common';
import { BrickService } from './brick.service';
import { BrickEntity } from './brick.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrickController } from './brick.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BrickEntity])],
  providers: [BrickService],
  controllers: [BrickController],
  exports: [BrickService],
})
export class BrickModule {}
