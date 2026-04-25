import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity';
import { Cita } from './entities/cita.entity';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { Vacuna } from './entities/vacuna.entity';
import { Medicamento } from './entities/medicamento.entity';
import {
  CreateMascotaDto,
  UpdateMascotaDto,
  CreateCitaDto,
  UpdateCitaDto,
  CreateHistoriaClinicaDto,
  UpdateHistoriaClinicaDto,
  CreateVacunaDto,
  UpdateVacunaDto,
  CreateMedicamentoDto,
  UpdateMedicamentoDto,
} from './dto/mascota.dto';

@Injectable()
export class MascotaService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
    @InjectRepository(HistoriaClinica)
    private readonly historiaRepository: Repository<HistoriaClinica>,
    @InjectRepository(Vacuna)
    private readonly vacunaRepository: Repository<Vacuna>,
    @InjectRepository(Medicamento)
    private readonly medicamentoRepository: Repository<Medicamento>,
  ) {}

  async createMascota(createDto: CreateMascotaDto): Promise<Mascota> {
    const mascota = this.mascotaRepository.create(createDto);
    return await this.mascotaRepository.save(mascota);
  }

  async findAllMascotas(): Promise<Mascota[]> {
    return await this.mascotaRepository.find({
      relations: ['propietario', 'raza'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneMascota(id: string): Promise<Mascota> {
    const mascota = await this.mascotaRepository.findOne({
      where: { id },
      relations: ['propietario', 'raza'],
    });
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return mascota;
  }

  async findMascotasByPropietario(propietarioId: string): Promise<Mascota[]> {
    return await this.mascotaRepository.find({
      where: { propietarioId },
      relations: ['propietario', 'raza'],
    });
  }

  async updateMascota(
    id: string,
    updateDto: UpdateMascotaDto,
  ): Promise<Mascota> {
    const mascota = await this.findOneMascota(id);
    Object.assign(mascota, updateDto);
    return await this.mascotaRepository.save(mascota);
  }

  async removeMascota(id: string): Promise<void> {
    const mascota = await this.findOneMascota(id);
    await this.mascotaRepository.remove(mascota);
  }

  async createCita(createDto: CreateCitaDto): Promise<Cita> {
    const cita = this.citaRepository.create(createDto);
    return await this.citaRepository.save(cita);
  }

  async findAllCitas(): Promise<Cita[]> {
    return await this.citaRepository.find({
      relations: ['mascota', 'veterinario'],
      order: { fechaHora: 'ASC' },
    });
  }

  async findOneCita(id: string): Promise<Cita> {
    const cita = await this.citaRepository.findOne({
      where: { id },
      relations: ['mascota', 'veterinario'],
    });
    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
    }
    return cita;
  }

  async findCitasByMascota(mascotaId: string): Promise<Cita[]> {
    return await this.citaRepository.find({
      where: { mascotaId },
      relations: ['mascota', 'veterinario'],
      order: { fechaHora: 'DESC' },
    });
  }

  async findCitasByVeterinario(veterinarioId: string): Promise<Cita[]> {
    return await this.citaRepository.find({
      where: { veterinarioId },
      relations: ['mascota', 'veterinario'],
      order: { fechaHora: 'ASC' },
    });
  }

  async updateCita(id: string, updateDto: UpdateCitaDto): Promise<Cita> {
    const cita = await this.findOneCita(id);
    Object.assign(cita, updateDto);
    return await this.citaRepository.save(cita);
  }

  async removeCita(id: string): Promise<void> {
    const cita = await this.findOneCita(id);
    await this.citaRepository.remove(cita);
  }

  async createHistoriaClinica(
    createDto: CreateHistoriaClinicaDto,
  ): Promise<HistoriaClinica> {
    const historia = this.historiaRepository.create(createDto);
    return await this.historiaRepository.save(historia);
  }

  async findAllHistoriasClinicas(): Promise<HistoriaClinica[]> {
    return await this.historiaRepository.find({
      relations: ['mascota'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneHistoriaClinica(id: string): Promise<HistoriaClinica> {
    const historia = await this.historiaRepository.findOne({
      where: { id },
      relations: ['mascota', 'vacunas', 'medicamentos'],
    });
    if (!historia) {
      throw new NotFoundException(
        `Historia clínica con ID ${id} no encontrada`,
      );
    }
    return historia;
  }

  async findHistoriasByMascota(mascotaId: string): Promise<HistoriaClinica[]> {
    return await this.historiaRepository.find({
      where: { mascotaId },
      relations: ['mascota'],
      order: { fecha: 'DESC' },
    });
  }

  async updateHistoriaClinica(
    id: string,
    updateDto: UpdateHistoriaClinicaDto,
  ): Promise<HistoriaClinica> {
    const historia = await this.findOneHistoriaClinica(id);
    Object.assign(historia, updateDto);
    return await this.historiaRepository.save(historia);
  }

  async removeHistoriaClinica(id: string): Promise<void> {
    const historia = await this.findOneHistoriaClinica(id);
    await this.historiaRepository.remove(historia);
  }

  async createVacuna(createDto: CreateVacunaDto): Promise<Vacuna> {
    const vacuna = this.vacunaRepository.create(createDto);
    return await this.vacunaRepository.save(vacuna);
  }

  async findAllVacunas(): Promise<Vacuna[]> {
    return await this.vacunaRepository.find({
      relations: ['historiaClinica', 'inventario'],
      order: { fechaAplicacion: 'DESC' },
    });
  }

  async findOneVacuna(id: string): Promise<Vacuna> {
    const vacuna = await this.vacunaRepository.findOne({
      where: { id },
      relations: ['historiaClinica', 'inventario'],
    });
    if (!vacuna) {
      throw new NotFoundException(`Vacuna con ID ${id} no encontrada`);
    }
    return vacuna;
  }

  async findVacunasByHistoriaClinica(
    historiaClinicaId: string,
  ): Promise<Vacuna[]> {
    return await this.vacunaRepository.find({
      where: { historiaClinicaId },
      relations: ['historiaClinica', 'inventario'],
    });
  }

  async updateVacuna(id: string, updateDto: UpdateVacunaDto): Promise<Vacuna> {
    const vacuna = await this.findOneVacuna(id);
    Object.assign(vacuna, updateDto);
    return await this.vacunaRepository.save(vacuna);
  }

  async removeVacuna(id: string): Promise<void> {
    const vacuna = await this.findOneVacuna(id);
    await this.vacunaRepository.remove(vacuna);
  }

  async createMedicamento(
    createDto: CreateMedicamentoDto,
  ): Promise<Medicamento> {
    const medicamento = this.medicamentoRepository.create(createDto);
    return await this.medicamentoRepository.save(medicamento);
  }

  async findAllMedicamentos(): Promise<Medicamento[]> {
    return await this.medicamentoRepository.find({
      relations: ['historiaClinica', 'inventario'],
      order: { id: 'DESC' },
    });
  }

  async findOneMedicamento(id: string): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({
      where: { id },
      relations: ['historiaClinica', 'inventario'],
    });
    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }
    return medicamento;
  }

  async findMedicamentosByHistoriaClinica(
    historiaClinicaId: string,
  ): Promise<Medicamento[]> {
    return await this.medicamentoRepository.find({
      where: { historiaClinicaId },
      relations: ['historiaClinica', 'inventario'],
    });
  }

  async updateMedicamento(
    id: string,
    updateDto: UpdateMedicamentoDto,
  ): Promise<Medicamento> {
    const medicamento = await this.findOneMedicamento(id);
    Object.assign(medicamento, updateDto);
    return await this.medicamentoRepository.save(medicamento);
  }

  async removeMedicamento(id: string): Promise<void> {
    const medicamento = await this.findOneMedicamento(id);
    await this.medicamentoRepository.remove(medicamento);
  }
}
