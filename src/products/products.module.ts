import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  // // Registra ambas entidades para habilitar la relación ManyToOne / OneToMany
  imports: [TypeOrmModule.forFeature([Product, Category])], 
  controllers: [ProductsController],
  providers: [ProductsService],
  // // Exporta el servicio para uso externo si es necesario
  exports: [ProductsService],
})
export class ProductsModule {}