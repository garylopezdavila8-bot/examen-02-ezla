import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio!: number;

  @Column()
  stock!: number;

  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;
}
