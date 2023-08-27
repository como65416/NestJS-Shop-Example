import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductType } from '../enum';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  type: ProductType;

  @Column()
  price: number;

  @Column({ name: 'remaining_amount' })
  remainingAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
