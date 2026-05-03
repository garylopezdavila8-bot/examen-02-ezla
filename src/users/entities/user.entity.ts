import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Rol } from '../enums/rol.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false }) // No expone la contraseña en consultas
  password!: string;

  @Column({ type: 'enum', enum: Rol, default: Rol.USER })
  role!: Rol;
}