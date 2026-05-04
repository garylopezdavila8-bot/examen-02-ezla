import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';

@Module({
  // // Registra la entidad Category en el contexto de este módulo
  imports: [TypeOrmModule.forFeature([Category])], 
  controllers: [CategoriesController],
  providers: [CategoriesService],
  // // Exporta TypeOrmModule para que otros módulos (como Products) vean esta entidad
  exports: [TypeOrmModule] 
})
export class CategoriesModule {}
