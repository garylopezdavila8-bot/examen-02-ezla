import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Rol } from '../users/enums/rol.enum';

type UserWithPassword = User & { password: string };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Asegura que no tenga []
    private readonly jwtService: JwtService,
  ) {}

  async register(registroDto: any) {
    const hashedPassword = await bcrypt.hash(registroDto.password, 10);

    const newUser = this.userRepository.create({
      ...registroDto,
      password: hashedPassword,
      role: Rol.USER,
    });

    // Se usa 'unknown' para forzar el cast y evitar el error ts(2352) de TypeORM
    const savedUser = (await this.userRepository.save(newUser)) as unknown as UserWithPassword;

    const { password: _password, ...result } = savedUser;
    return result;
  }

  async login(loginDto: any) {
    const { username, password } = loginDto;

    // Se usa 'unknown' aquí también por consistencia
    const user = (await this.userRepository.findOne({
      where: { username },
      select: ['id', 'nombre', 'username', 'password', 'role'],
    })) as unknown as UserWithPassword | null;

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { 
      id: user.id, 
      username: user.username, 
      role: user.role 
    };

    return {
      nombre: user.nombre,
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}