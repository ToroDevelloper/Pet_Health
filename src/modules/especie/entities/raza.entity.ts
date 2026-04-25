import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Especie } from './especie.entity';

@Entity('razas')
export class Raza {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('text', { nullable: true })
  caracteristicas: string;

  @Column('uuid')
  especieId: string;

  @ManyToOne(() => Especie, (especie) => especie.razas)
  @JoinColumn({ name: 'especieId' })
  especie: Especie;
}
