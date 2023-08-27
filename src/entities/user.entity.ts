import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enum';
import { UserOrderEntity } from './user-order.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 'Member' })
  role: UserRole;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @OneToMany(() => UserOrderEntity, (order) => order.user)
  @JoinColumn({ referencedColumnName: 'user_id' })
  orders?: UserOrderEntity[];
}
