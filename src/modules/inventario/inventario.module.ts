import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { Proveedor } from './entities/proveedor.entity';
import { Inventario } from './entities/inventario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor, Inventario])],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService],
})
export class InventarioModule {}
