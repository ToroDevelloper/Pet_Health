import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Rol } from './modules/rol/entities/rol.entity';
import { User } from './modules/user/entities/user.entity';
import { Admin } from './modules/user/entities/admin.entity';
import { Veterinario } from './modules/user/entities/veterinario.entity';
import { Recepcionista } from './modules/user/entities/recepcionista.entity';
import { Propietario } from './modules/user/entities/propietario.entity';
import { Especie } from './modules/especie/entities/especie.entity';
import { Raza } from './modules/especie/entities/raza.entity';
import { Mascota } from './modules/mascota/entities/mascota.entity';
import { Cita } from './modules/mascota/entities/cita.entity';
import { HistoriaClinica } from './modules/mascota/entities/historia-clinica.entity';
import { Vacuna } from './modules/mascota/entities/vacuna.entity';
import { Medicamento } from './modules/mascota/entities/medicamento.entity';
import { Proveedor } from './modules/inventario/entities/proveedor.entity';
import { Inventario } from './modules/inventario/entities/inventario.entity';
import { Reporte } from './modules/reporte/entities/reporte.entity';
import { Notificacion } from './modules/notificacion/entities/notificacion.entity';
import { NotificacionCita } from './modules/notificacion/entities/notificacion-cita.entity';
import { NotificacionInventario } from './modules/notificacion/entities/notificacion-inventario.entity';
import { RolModule } from './modules/rol/rol.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { VeterinarioModule } from './modules/veterinario/veterinario.module';
import { RecepcionistaModule } from './modules/recepcionista/recepcionista.module';
import { PropietarioModule } from './modules/propietario/propietario.module';
import { EspecieModule } from './modules/especie/especie.module';
import { MascotaModule } from './modules/mascota/mascota.module';
import { InventarioModule } from './modules/inventario/inventario.module';
import { ReporteModule } from './modules/reporte/reporte.module';
import { NotificacionModule } from './modules/notificacion/notificacion.module';
import { SeederService } from './common/seeder.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Rol,
          User,
          Admin,
          Veterinario,
          Recepcionista,
          Propietario,
          Especie,
          Raza,
          Mascota,
          Cita,
          HistoriaClinica,
          Vacuna,
          Medicamento,
          Proveedor,
          Inventario,
          Reporte,
          Notificacion,
          NotificacionCita,
          NotificacionInventario,
        ],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        logging: configService.get<boolean>('DB_LOGGING'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Rol, User]),
    RolModule,
    UserModule,
    AuthModule,
    AdminModule,
    VeterinarioModule,
    RecepcionistaModule,
    PropietarioModule,
    EspecieModule,
    MascotaModule,
    InventarioModule,
    ReporteModule,
    NotificacionModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}