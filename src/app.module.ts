import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. Carga las variables de entorno (.env en local, Environment en Render)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configuración de la conexión a la base de datos de Aiven
TypeOrmModule.forRoot({
  type: 'mysql', // Cambiado de 'postgres' a 'mysql'
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '11979', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true, 
  // Configuración obligatoria para el SSL de Aiven
  ssl: {
    rejectUnauthorized: false,
  },
}),
    ProductsModule, 
    CategoriesModule, 
    OrdersModule, 
    CustomersModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
