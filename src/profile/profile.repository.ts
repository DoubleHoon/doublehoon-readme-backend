import { DataSource, Repository } from 'typeorm';
import { CustomRepository } from '@/database/typeorm-ex.decorator';
import { Injectable } from '@nestjs/common';
import { ProfileEntity } from './profile.entity';

@Injectable()
@CustomRepository(ProfileEntity)
export class ProfileRepository extends Repository<ProfileEntity> {
  constructor(private dataSource: DataSource) {
    super(ProfileEntity, dataSource.createEntityManager());
  }
}
