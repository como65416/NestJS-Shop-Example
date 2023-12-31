import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_order')
export class UserOrderEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'order_id' })
  order_id: number;

  @Column({ name: 'product_id' })
  product_id: number;

  @Column()
  amount: number;
}
