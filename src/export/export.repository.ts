import { DataSource, Repository } from 'typeorm';
import { CustomRepository } from '@/database/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';
import { ExportEntity } from './export.entity';

@Injectable()
@CustomRepository(ExportEntity)
export class ExportRepository extends Repository<ExportEntity> {
  constructor(private dataSource: DataSource) {
    super(ExportEntity, dataSource.createEntityManager());
  }
}
