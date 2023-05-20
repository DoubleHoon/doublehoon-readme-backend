import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CustomRepository } from '@/database/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';

@Injectable()
@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
