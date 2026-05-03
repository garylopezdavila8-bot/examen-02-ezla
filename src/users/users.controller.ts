import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Rol } from './enums/rol.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Rol.DEVELOPER)
  create(@Body() createDto: any) {
    // Ahora el servicio ya tiene este método
    return this.usersService.create(createDto);
  }

  @Patch(':id')
  @Roles(Rol.DEVELOPER)
  update(@Param('id') id: string, @Body() updateDto: any) {
    // Enviamos el ID y el cuerpo de la actualización para cumplir con los 2 argumentos
    return this.usersService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(Rol.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch(':id/make-admin')
  @Roles(Rol.ADMIN)
  makeAdmin(@Param('id') id: string) {
    return this.usersService.makeAdmin(+id);
  }

  @Get()
  findAll(@Request() req) {
    if (req.user.role === Rol.ADMIN || req.user.role === Rol.DEVELOPER) {
      return this.usersService.findAll();
    }
    return this.usersService.findOne(req.user.id);
  }
}