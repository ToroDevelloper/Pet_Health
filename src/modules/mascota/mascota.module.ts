import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaController } from './mascota.controller';
import { MascotaService } from './mascota.service';
import { Mascota } from './entities/mascota.entity';
import { Cita } from './entities/cita.entity';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { Vacuna } from './entities/vacuna.entity';
import { Medicamento } from './entities/medicamento.entity';
import { UserModule } from '../user/user.module';
import { EspecieModule } from '../especie/especie.module';
import { InventarioModule } from '../inventario/inventario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Mascota,
      Cita,
      HistoriaClinica,
      Vacuna,
      Medicamento,
    ]),
    UserModule,
    EspecieModule,
    InventarioModule,
  ],
  controllers: [MascotaController],
  providers: [MascotaService],
  exports: [MascotaService],
})
export class MascotaModule {}
