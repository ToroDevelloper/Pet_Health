import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InventarioService } from './inventario.service';
import {
  CreateProveedorDto,
  UpdateProveedorDto,
  CreateInventarioDto,
  UpdateInventarioDto,
} from './dto/inventario.dto';
import { Proveedor } from './entities/proveedor.entity';
import { Inventario } from './entities/inventario.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleType } from '../rol/entities/rol.entity';

@ApiTags('Inventario')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post('proveedores')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Crear un nuevo proveedor' })
  @ApiResponse({
    status: 201,
    description: 'Proveedor creado exitosamente',
    type: Proveedor,
  })
  createProveedor(@Body() createDto: CreateProveedorDto): Promise<Proveedor> {
    return this.inventarioService.createProveedor(createDto);
  }

  @Get('proveedores')
  @ApiOperation({ summary: 'Obtener todos los proveedores' })
  @ApiResponse({
    status: 200,
    description: 'Proveedores obtenidos exitosamente',
    type: [Proveedor],
  })
  findAllProveedores(): Promise<Proveedor[]> {
    return this.inventarioService.findAllProveedores();
  }

  @Get('proveedores/:id')
  @ApiOperation({ summary: 'Obtener un proveedor por ID' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor obtenido exitosamente',
    type: Proveedor,
  })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  findOneProveedor(@Param('id', ParseUUIDPipe) id: string): Promise<Proveedor> {
    return this.inventarioService.findOneProveedor(id);
  }

  @Patch('proveedores/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Actualizar un proveedor' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor actualizado exitosamente',
    type: Proveedor,
  })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  updateProveedor(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateProveedorDto,
  ): Promise<Proveedor> {
    return this.inventarioService.updateProveedor(id, updateDto);
  }

  @Delete('proveedores/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  @ApiResponse({ status: 200, description: 'Proveedor eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  removeProveedor(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.inventarioService.removeProveedor(id);
  }

  @Post('inventario')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECEPCIONISTA)
  @ApiOperation({ summary: 'Crear un nuevo producto en inventario' })
  @ApiResponse({
    status: 201,
    description: 'Producto creado exitosamente',
    type: Inventario,
  })
  createInventario(
    @Body() createDto: CreateInventarioDto,
  ): Promise<Inventario> {
    return this.inventarioService.createInventario(createDto);
  }

  @Get('inventario')
  @ApiOperation({ summary: 'Obtener todo el inventario' })
  @ApiResponse({
    status: 200,
    description: 'Inventario obtenido exitosamente',
    type: [Inventario],
  })
  findAllInventario(): Promise<Inventario[]> {
    return this.inventarioService.findAllInventario();
  }

  @Get('inventario/bajo-stock')
  @ApiOperation({ summary: 'Obtener productos con stock bajo' })
  @ApiResponse({
    status: 200,
    description: 'Productos obtenidos exitosamente',
    type: [Inventario],
  })
  findInventarioBajoStock(): Promise<Inventario[]> {
    return this.inventarioService.findInventarioBajoStock();
  }

  @Get('inventario/proveedor/:proveedorId')
  @ApiOperation({ summary: 'Obtener inventario por proveedor' })
  @ApiResponse({
    status: 200,
    description: 'Inventario obtenido exitosamente',
    type: [Inventario],
  })
  findInventarioByProveedor(
    @Param('proveedorId', ParseUUIDPipe) proveedorId: string,
  ): Promise<Inventario[]> {
    return this.inventarioService.findInventarioByProveedor(proveedorId);
  }

  @Get('inventario/tipo/:tipo')
  @ApiOperation({ summary: 'Obtener inventario por tipo' })
  @ApiResponse({
    status: 200,
    description: 'Inventario obtenido exitosamente',
    type: [Inventario],
  })
  findInventarioByTipo(@Param('tipo') tipo: string): Promise<Inventario[]> {
    return this.inventarioService.findInventarioByTipo(tipo);
  }

  @Get('inventario/:id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Producto obtenido exitosamente',
    type: Inventario,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOneInventario(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Inventario> {
    return this.inventarioService.findOneInventario(id);
  }

  @Patch('inventario/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECEPCIONISTA)
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente',
    type: Inventario,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  updateInventario(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateInventarioDto,
  ): Promise<Inventario> {
    return this.inventarioService.updateInventario(id, updateDto);
  }

  @Patch('inventario/:id/stock')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECEPCIONISTA)
  @ApiOperation({ summary: 'Actualizar stock de un producto' })
  @ApiResponse({
    status: 200,
    description: 'Stock actualizado exitosamente',
    type: Inventario,
  })
  updateStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('stockActual') stockActual: number,
  ): Promise<Inventario> {
    return this.inventarioService.updateStock(id, stockActual);
  }

  @Delete('inventario/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  removeInventario(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.inventarioService.removeInventario(id);
  }
}
