import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('bricks')
export class BrickEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column()
  @Generated('uuid')
  brickUuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 2047,
    default:
      'default',
  })
  brickIcon: string;

  @Column({
    type: 'varchar',
    length: 2047,
    default:
      'default',
  })
  brickBanner: string;

  @Column({
    type: 'varchar',
    length: 64,
    default: '제목',
  })
  brickTitle: string;

  @Column({
    type: 'varchar',
    length: 256,
    default: '한 줄 소개',
  })
  brickSummary: string;

  /**
   * 사용자 작성 부분을 string 형태로 저장
   * TODO: 더 좋은 방법 찾기 - json으로 저장, nosql db 분리
   */
  @Column({
    type: 'mediumtext',
  })
  brickDetail: string;
}
