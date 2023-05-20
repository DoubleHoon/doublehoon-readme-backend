import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @Column()
  @Generated('uuid')
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 511,
  })
  imageUrl: string;
}
