import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: any) {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll() {
    // Usamos relations para que en el JSON aparezca la categoría del producto
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ 
      where: { id }, 
      relations: ['category'] 
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async update(id: number, updateProductDto: any) {
    // Primero verificamos si existe
    await this.findOne(id);
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    // Primero verificamos si existe
    await this.findOne(id);
    await this.productRepository.delete(id);
    return { message: `Producto con ID ${id} eliminado` };
  }
}