import { Module } from '@nestjs/common';
import { ExportService } from './export.service';
import { ExportController } from './export.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportEntity } from './export.entity';
import { BrickModule } from '@/brick/brick.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExportEntity]), BrickModule],
  controllers: [ExportController],
  providers: [ExportService],
  exports: [ExportService],
})
export class ExportModule {}
