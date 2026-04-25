import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especie } from './entities/especie.entity';
import { Raza } from './entities/raza.entity';
import { CreateEspecieDto, UpdateEspecieDto } from './dto/especie.dto';
import { CreateRazaDto, UpdateRazaDto } from './dto/raza.dto';

@Injectable()
export class EspecieService {
  constructor(
    @InjectRepository(Especie)
    private readonly especieRepository: Repository<Especie>,
    @InjectRepository(Raza)
    private readonly razaRepository: Repository<Raza>,
  ) {}

  async createEspecie(createDto: CreateEspecieDto): Promise<Especie> {
    const existing = await this.especieRepository.findOne({
      where: { nombre: createDto.nombre },
    });
    if (existing) {
      throw new ConflictException('La especie ya existe');
    }
    const especie = this.especieRepository.create(createDto);
    return await this.especieRepository.save(especie);
  }

  async findAllEspecies(): Promise<Especie[]> {
    return await this.especieRepository.find({
      relations: ['razas'],
      order: { nombre: 'ASC' },
    });
  }

  async findOneEspecie(id: string): Promise<Especie> {
    const especie = await this.especieRepository.findOne({
      where: { id },
      relations: ['razas'],
    });
    if (!especie) {
      throw new NotFoundException(`Especie con ID ${id} no encontrada`);
    }
    return especie;
  }

  async updateEspecie(
    id: string,
    updateDto: UpdateEspecieDto,
  ): Promise<Especie> {
    const especie = await this.findOneEspecie(id);
    if (updateDto.nombre && updateDto.nombre !== especie.nombre) {
      const existing = await this.especieRepository.findOne({
        where: { nombre: updateDto.nombre },
      });
      if (existing) {
        throw new ConflictException('El nombre de especie ya está en uso');
      }
    }
    Object.assign(especie, updateDto);
    return await this.especieRepository.save(especie);
  }

  async removeEspecie(id: string): Promise<void> {
    const especie = await this.findOneEspecie(id);
    await this.especieRepository.remove(especie);
  }

  async createRaza(createDto: CreateRazaDto): Promise<Raza> {
    const especie = await this.especieRepository.findOne({
      where: { id: createDto.especieId },
    });
    if (!especie) {
      throw new NotFoundException(
        `Especie con ID ${createDto.especieId} no encontrada`,
      );
    }
    const existing = await this.razaRepository.findOne({
      where: { nombre: createDto.nombre },
    });
    if (existing) {
      throw new ConflictException('La raza ya existe');
    }
    const raza = this.razaRepository.create({ ...createDto, especie });
    return await this.razaRepository.save(raza);
  }

  async findAllRazas(): Promise<Raza[]> {
    return await this.razaRepository.find({
      relations: ['especie'],
      order: { nombre: 'ASC' },
    });
  }

  async findRazasByEspecie(especieId: string): Promise<Raza[]> {
    return await this.razaRepository.find({
      where: { especieId },
      relations: ['especie'],
      order: { nombre: 'ASC' },
    });
  }

  async findOneRaza(id: string): Promise<Raza> {
    const raza = await this.razaRepository.findOne({
      where: { id },
      relations: ['especie'],
    });
    if (!raza) {
      throw new NotFoundException(`Raza con ID ${id} no encontrada`);
    }
    return raza;
  }

  async updateRaza(id: string, updateDto: UpdateRazaDto): Promise<Raza> {
    const raza = await this.findOneRaza(id);
    if (updateDto.especieId) {
      const especie = await this.especieRepository.findOne({
        where: { id: updateDto.especieId },
      });
      if (!especie) {
        throw new NotFoundException(
          `Especie con ID ${updateDto.especieId} no encontrada`,
        );
      }
      raza.especie = especie;
    }
    if (updateDto.nombre) {
      raza.nombre = updateDto.nombre;
    }
    if (updateDto.caracteristicas !== undefined) {
      raza.caracteristicas = updateDto.caracteristicas;
    }
    return await this.razaRepository.save(raza);
  }

  async removeRaza(id: string): Promise<void> {
    const raza = await this.findOneRaza(id);
    await this.razaRepository.remove(raza);
  }
}
