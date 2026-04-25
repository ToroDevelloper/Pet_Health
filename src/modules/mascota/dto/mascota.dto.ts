import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsNumber,
  Min,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMascotaDto {
  @ApiProperty({ example: 'uuid-propietario' })
  @IsUUID()
  @IsNotEmpty()
  propietarioId: string;

  @ApiProperty({ example: 'uuid-raza' })
  @IsUUID()
  @IsNotEmpty()
  razaId: string;

  @ApiProperty({ example: 'Firulais' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  edad: number;

  @ApiProperty({ example: 'macho' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  sexo: string;

  @ApiProperty({ example: 15.5 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  peso: number;

  @ApiPropertyOptional({ example: 'Café' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  color?: string;
}

export class UpdateMascotaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  propietarioId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  razaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  edad?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  sexo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  peso?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  color?: string;
}

export class CreateCitaDto {
  @ApiProperty({ example: 'uuid-mascota' })
  @IsUUID()
  @IsNotEmpty()
  mascotaId: string;

  @ApiProperty({ example: 'uuid-veterinario' })
  @IsUUID()
  @IsNotEmpty()
  veterinarioId: string;

  @ApiProperty({ example: '2026-04-25T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  fechaHora: string;

  @ApiProperty({ example: 'Vacunación anual' })
  @IsString()
  @IsNotEmpty()
  motivo: string;

  @ApiProperty({ example: 'pendiente' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  estado: string;
}

export class UpdateCitaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  mascotaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  veterinarioId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fechaHora?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  motivo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  estado?: string;
}

export class CreateHistoriaClinicaDto {
  @ApiProperty({ example: 'uuid-mascota' })
  @IsUUID()
  @IsNotEmpty()
  mascotaId: string;

  @ApiPropertyOptional({ example: 'uuid-cita' })
  @IsOptional()
  @IsUUID()
  citaId?: string;

  @ApiProperty({ example: '2026-04-24T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty({ example: 'Chequeo general, sano' })
  @IsString()
  @IsNotEmpty()
  diagnostico: string;

  @ApiProperty({ example: 'Vacuna anual aplicada' })
  @IsString()
  @IsNotEmpty()
  tratamiento: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class UpdateHistoriaClinicaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  mascotaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  citaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  diagnostico?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tratamiento?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateVacunaDto {
  @ApiProperty({ example: 'uuid-historia' })
  @IsUUID()
  @IsNotEmpty()
  historiaClinicaId: string;

  @ApiProperty({ example: 'uuid-inventario' })
  @IsUUID()
  @IsNotEmpty()
  inventarioId: string;

  @ApiProperty({ example: 'Vacuna antirrábica' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: '2026-04-24T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  fechaAplicacion: string;

  @ApiPropertyOptional({ example: '2027-04-24T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  fechaProximoRefuerzo?: string;

  @ApiProperty({ example: '1/1' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  dosis: string;

  @ApiPropertyOptional({ example: 'LOTE-2026' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lote?: string;
}

export class UpdateVacunaDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  historiaClinicaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  inventarioId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fechaAplicacion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fechaProximoRefuerzo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  dosis?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  lote?: string;
}

export class CreateMedicamentoDto {
  @ApiProperty({ example: 'uuid-historia' })
  @IsUUID()
  @IsNotEmpty()
  historiaClinicaId: string;

  @ApiProperty({ example: 'uuid-inventario' })
  @IsUUID()
  @IsNotEmpty()
  inventarioId: string;

  @ApiProperty({ example: 'Amoxicilina' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Oral' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  viaAdministracion: string;

  @ApiPropertyOptional({ example: '500mg' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  dosis?: string;
}

export class UpdateMedicamentoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  historiaClinicaId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  inventarioId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nombre?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  viaAdministracion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  dosis?: string;
}
