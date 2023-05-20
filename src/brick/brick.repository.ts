import { DataSource, Repository } from 'typeorm';
import { CustomRepository } from '@/database/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';
import { BrickEntity } from './brick.entity';
import { BrickLongDto, BrickShortDto } from './dto/brick.dto';

@Injectable()
@CustomRepository(BrickEntity)
export class BrickRepository extends Repository<BrickEntity> {
  constructor(private dataSource: DataSource) {
    super(BrickEntity, dataSource.createEntityManager());
  }
}
