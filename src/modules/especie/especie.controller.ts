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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EspecieService } from './especie.service';
import { CreateEspecieDto, UpdateEspecieDto } from './dto/especie.dto';
import { CreateRazaDto, UpdateRazaDto } from './dto/raza.dto';
import { Especie } from './entities/especie.entity';
import { Raza } from './entities/raza.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Especies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('especies')
export class EspecieController {
  constructor(private readonly especieService: EspecieService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva especie' })
  @ApiResponse({
    status: 201,
    description: 'Especie creada exitosamente',
    type: Especie,
  })
  createEspecie(@Body() createDto: CreateEspecieDto): Promise<Especie> {
    return this.especieService.createEspecie(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las especies' })
  @ApiResponse({
    status: 200,
    description: 'Especies obtenidas exitosamente',
    type: [Especie],
  })
  findAllEspecies(): Promise<Especie[]> {
    return this.especieService.findAllEspecies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una especie por ID' })
  @ApiResponse({
    status: 200,
    description: 'Especie obtenida exitosamente',
    type: Especie,
  })
  @ApiResponse({ status: 404, description: 'Especie no encontrada' })
  findOneEspecie(@Param('id', ParseUUIDPipe) id: string): Promise<Especie> {
    return this.especieService.findOneEspecie(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una especie' })
  @ApiResponse({
    status: 200,
    description: 'Especie actualizada exitosamente',
    type: Especie,
  })
  @ApiResponse({ status: 404, description: 'Especie no encontrada' })
  updateEspecie(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateEspecieDto,
  ): Promise<Especie> {
    return this.especieService.updateEspecie(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una especie' })
  @ApiResponse({ status: 200, description: 'Especie eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Especie no encontrada' })
  removeEspecie(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.especieService.removeEspecie(id);
  }

  @Post('razas')
  @ApiOperation({ summary: 'Crear una nueva raza' })
  @ApiResponse({
    status: 201,
    description: 'Raza creada exitosamente',
    type: Raza,
  })
  createRaza(@Body() createDto: CreateRazaDto): Promise<Raza> {
    return this.especieService.createRaza(createDto);
  }

  @Get('razas/all')
  @ApiOperation({ summary: 'Obtener todas las razas' })
  @ApiResponse({
    status: 200,
    description: 'Razas obtenidas exitosamente',
    type: [Raza],
  })
  findAllRazas(): Promise<Raza[]> {
    return this.especieService.findAllRazas();
  }

  @Get('razas/especie/:especieId')
  @ApiOperation({ summary: 'Obtener razas por especie' })
  @ApiResponse({
    status: 200,
    description: 'Razas obtenidas exitosamente',
    type: [Raza],
  })
  findRazasByEspecie(
    @Param('especieId', ParseUUIDPipe) especieId: string,
  ): Promise<Raza[]> {
    return this.especieService.findRazasByEspecie(especieId);
  }

  @Get('razas/:id')
  @ApiOperation({ summary: 'Obtener una raza por ID' })
  @ApiResponse({
    status: 200,
    description: 'Raza obtenida exitosamente',
    type: Raza,
  })
  @ApiResponse({ status: 404, description: 'Raza no encontrada' })
  findOneRaza(@Param('id', ParseUUIDPipe) id: string): Promise<Raza> {
    return this.especieService.findOneRaza(id);
  }

  @Patch('razas/:id')
  @ApiOperation({ summary: 'Actualizar una raza' })
  @ApiResponse({
    status: 200,
    description: 'Raza actualizada exitosamente',
    type: Raza,
  })
  @ApiResponse({ status: 404, description: 'Raza no encontrada' })
  updateRaza(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateRazaDto,
  ): Promise<Raza> {
    return this.especieService.updateRaza(id, updateDto);
  }

  @Delete('razas/:id')
  @ApiOperation({ summary: 'Eliminar una raza' })
  @ApiResponse({ status: 200, description: 'Raza eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Raza no encontrada' })
  removeRaza(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.especieService.removeRaza(id);
  }
}
