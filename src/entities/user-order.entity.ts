import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

enum Status {
  UNPAID = 'unpaid',
  PAID = 'paid',
  CANCELED = 'canceled',
}

@Entity('user_order')
export class UserOrderEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  total_price: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.UNPAID,
  })
  status: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
