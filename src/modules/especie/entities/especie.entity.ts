import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Raza } from './raza.entity';

@Entity('especies')
export class Especie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('text', { nullable: true })
  constantesVitales: string;

  @Column('text', { nullable: true })
  observaciones: string;

  @OneToMany(() => Raza, (raza) => raza.especie)
  razas: Raza[];
}
