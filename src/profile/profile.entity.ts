import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column()
  userId: string;

  @Column()
  userUuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 1023,
  })
  userInfo: string;

  @Column({
    type: 'varchar',
    length: 1023,
  })
  brickList: string;
}
