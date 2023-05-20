import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column()
  @Generated('uuid')
  userId: string;

  @Column()
  @Generated('uuid')
  userUuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'bigint',
  })
  kakaoId: number;

  @Column({
    type: 'varchar',
    length: 45,
  })
  userName: string;
}
