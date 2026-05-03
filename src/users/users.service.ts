import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Rol } from './enums/rol.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Agregamos el método create que faltaba
  async create(createDto: any) {
    const newUser = this.userRepository.create(createDto);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Ajustamos para recibir id y los datos a actualizar
  async update(id: number, updateDto: any) {
    await this.userRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { message: `Usuario con ID ${id} eliminado` };
  }

  async makeAdmin(id: number) {
    await this.userRepository.update(id, { role: Rol.ADMIN });
    return { message: `Usuario con ID ${id} ahora es ADMIN` };
  }
}