import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Inventario } from './entities/inventario.entity';
import {
  CreateProveedorDto,
  UpdateProveedorDto,
  CreateInventarioDto,
  UpdateInventarioDto,
} from './dto/inventario.dto';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepository: Repository<Proveedor>,
    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async createProveedor(createDto: CreateProveedorDto): Promise<Proveedor> {
    const existing = await this.proveedorRepository.findOne({
      where: { correo: createDto.correo },
    });
    if (existing) {
      throw new ConflictException('El correo del proveedor ya está registrado');
    }
    const proveedor = this.proveedorRepository.create(createDto);
    return await this.proveedorRepository.save(proveedor);
  }

  async findAllProveedores(): Promise<Proveedor[]> {
    return await this.proveedorRepository.find({
      relations: ['inventarios'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneProveedor(id: string): Promise<Proveedor> {
    const proveedor = await this.proveedorRepository.findOne({
      where: { id },
      relations: ['inventarios'],
    });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
    return proveedor;
  }

  async updateProveedor(
    id: string,
    updateDto: UpdateProveedorDto,
  ): Promise<Proveedor> {
    const proveedor = await this.findOneProveedor(id);
    Object.assign(proveedor, updateDto);
    return await this.proveedorRepository.save(proveedor);
  }

  async removeProveedor(id: string): Promise<void> {
    const proveedor = await this.findOneProveedor(id);
    await this.proveedorRepository.remove(proveedor);
  }

  async createInventario(createDto: CreateInventarioDto): Promise<Inventario> {
    const inventario = this.inventarioRepository.create(createDto);
    return await this.inventarioRepository.save(inventario);
  }

  async findAllInventario(): Promise<Inventario[]> {
    return await this.inventarioRepository.find({
      relations: ['proveedor'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneInventario(id: string): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({
      where: { id },
      relations: ['proveedor'],
    });
    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return inventario;
  }

  async findInventarioByProveedor(proveedorId: string): Promise<Inventario[]> {
    return await this.inventarioRepository.find({
      where: { proveedorId },
      relations: ['proveedor'],
    });
  }

  async findInventarioByTipo(tipo: string): Promise<Inventario[]> {
    return await this.inventarioRepository.find({
      where: { tipo },
      relations: ['proveedor'],
    });
  }

  async findInventarioBajoStock(): Promise<Inventario[]> {
    return await this.inventarioRepository
      .createQueryBuilder('inventario')
      .where('inventario.stockActual <= inventario.stockMinimo')
      .getMany();
  }

  async updateInventario(
    id: string,
    updateDto: UpdateInventarioDto,
  ): Promise<Inventario> {
    const inventario = await this.findOneInventario(id);
    Object.assign(inventario, updateDto);
    return await this.inventarioRepository.save(inventario);
  }

  async removeInventario(id: string): Promise<void> {
    const inventario = await this.findOneInventario(id);
    await this.inventarioRepository.remove(inventario);
  }

  async updateStock(id: string, stockActual: number): Promise<Inventario> {
    const inventario = await this.findOneInventario(id);
    inventario.stockActual = stockActual;
    return await this.inventarioRepository.save(inventario);
  }
}
