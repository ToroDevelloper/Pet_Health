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
import { MascotaService } from './mascota.service';
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
import { Mascota } from './entities/mascota.entity';
import { Cita } from './entities/cita.entity';
import { HistoriaClinica } from './entities/historia-clinica.entity';
import { Vacuna } from './entities/vacuna.entity';
import { Medicamento } from './entities/medicamento.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleType } from '../rol/entities/rol.entity';

@ApiTags('Mascotas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class MascotaController {
  constructor(private readonly mascotaService: MascotaService) {}

  @Post('mascotas')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECEPCIONISTA, RoleType.PROPIETARIO)
  @ApiOperation({ summary: 'Crear una nueva mascota' })
  @ApiResponse({
    status: 201,
    description: 'Mascota creada exitosamente',
    type: Mascota,
  })
  createMascota(@Body() createDto: CreateMascotaDto): Promise<Mascota> {
    return this.mascotaService.createMascota(createDto);
  }

  @Get('mascotas')
  @ApiOperation({ summary: 'Obtener todas las mascotas' })
  @ApiResponse({
    status: 200,
    description: 'Mascotas obtenidas exitosamente',
    type: [Mascota],
  })
  findAllMascotas(): Promise<Mascota[]> {
    return this.mascotaService.findAllMascotas();
  }

  @Get('mascotas/propietario/:propietarioId')
  @ApiOperation({ summary: 'Obtener mascotas por propietario' })
  @ApiResponse({
    status: 200,
    description: 'Mascotas obtenidas exitosamente',
    type: [Mascota],
  })
  findMascotasByPropietario(
    @Param('propietarioId', ParseUUIDPipe) propietarioId: string,
  ): Promise<Mascota[]> {
    return this.mascotaService.findMascotasByPropietario(propietarioId);
  }

  @Get('mascotas/:id')
  @ApiOperation({ summary: 'Obtener una mascota por ID' })
  @ApiResponse({
    status: 200,
    description: 'Mascota obtenida exitosamente',
    type: Mascota,
  })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
  findOneMascota(@Param('id', ParseUUIDPipe) id: string): Promise<Mascota> {
    return this.mascotaService.findOneMascota(id);
  }

  @Patch('mascotas/:id')
  @ApiOperation({ summary: 'Actualizar una mascota' })
  @ApiResponse({
    status: 200,
    description: 'Mascota actualizada exitosamente',
    type: Mascota,
  })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
  updateMascota(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateMascotaDto,
  ): Promise<Mascota> {
    return this.mascotaService.updateMascota(id, updateDto);
  }

  @Delete('mascotas/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECEPCIONISTA)
  @ApiOperation({ summary: 'Eliminar una mascota' })
  @ApiResponse({ status: 200, description: 'Mascota eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
  removeMascota(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mascotaService.removeMascota(id);
  }

  @Post('citas')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECEPCIONISTA)
  @ApiOperation({ summary: 'Crear una nueva cita' })
  @ApiResponse({
    status: 201,
    description: 'Cita creada exitosamente',
    type: Cita,
  })
  createCita(@Body() createDto: CreateCitaDto): Promise<Cita> {
    return this.mascotaService.createCita(createDto);
  }

  @Get('citas')
  @ApiOperation({ summary: 'Obtener todas las citas' })
  @ApiResponse({
    status: 200,
    description: 'Citas obtenidas exitosamente',
    type: [Cita],
  })
  findAllCitas(): Promise<Cita[]> {
    return this.mascotaService.findAllCitas();
  }

  @Get('citas/mascota/:mascotaId')
  @ApiOperation({ summary: 'Obtener citas por mascota' })
  @ApiResponse({
    status: 200,
    description: 'Citas obtenidas exitosamente',
    type: [Cita],
  })
  findCitasByMascota(
    @Param('mascotaId', ParseUUIDPipe) mascotaId: string,
  ): Promise<Cita[]> {
    return this.mascotaService.findCitasByMascota(mascotaId);
  }

  @Get('citas/veterinario/:veterinarioId')
  @ApiOperation({ summary: 'Obtener citas por veterinario' })
  @ApiResponse({
    status: 200,
    description: 'Citas obtenidas exitosamente',
    type: [Cita],
  })
  findCitasByVeterinario(
    @Param('veterinarioId', ParseUUIDPipe) veterinarioId: string,
  ): Promise<Cita[]> {
    return this.mascotaService.findCitasByVeterinario(veterinarioId);
  }

  @Get('citas/:id')
  @ApiOperation({ summary: 'Obtener una cita por ID' })
  @ApiResponse({
    status: 200,
    description: 'Cita obtenida exitosamente',
    type: Cita,
  })
  @ApiResponse({ status: 404, description: 'Cita no encontrada' })
  findOneCita(@Param('id', ParseUUIDPipe) id: string): Promise<Cita> {
    return this.mascotaService.findOneCita(id);
  }

  @Patch('citas/:id')
  @ApiOperation({ summary: 'Actualizar una cita' })
  @ApiResponse({
    status: 200,
    description: 'Cita actualizada exitosamente',
    type: Cita,
  })
  @ApiResponse({ status: 404, description: 'Cita no encontrada' })
  updateCita(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCitaDto,
  ): Promise<Cita> {
    return this.mascotaService.updateCita(id, updateDto);
  }

  @Delete('citas/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.RECEPCIONISTA)
  @ApiOperation({ summary: 'Eliminar una cita' })
  @ApiResponse({ status: 200, description: 'Cita eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Cita no encontrada' })
  removeCita(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mascotaService.removeCita(id);
  }

  @Post('historias-clinicas')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.VETERINARIO)
  @ApiOperation({ summary: 'Crear una nueva historia clínica' })
  @ApiResponse({
    status: 201,
    description: 'Historia clínica creada exitosamente',
    type: HistoriaClinica,
  })
  createHistoriaClinica(
    @Body() createDto: CreateHistoriaClinicaDto,
  ): Promise<HistoriaClinica> {
    return this.mascotaService.createHistoriaClinica(createDto);
  }

  @Get('historias-clinicas')
  @ApiOperation({ summary: 'Obtener todas las historias clínicas' })
  @ApiResponse({
    status: 200,
    description: 'Historias clínicas obtenidas exitosamente',
    type: [HistoriaClinica],
  })
  findAllHistoriasClinicas(): Promise<HistoriaClinica[]> {
    return this.mascotaService.findAllHistoriasClinicas();
  }

  @Get('historias-clinicas/mascota/:mascotaId')
  @ApiOperation({ summary: 'Obtener historias clínicas por mascota' })
  @ApiResponse({
    status: 200,
    description: 'Historias clínicas obtenidas exitosamente',
    type: [HistoriaClinica],
  })
  findHistoriasByMascota(
    @Param('mascotaId', ParseUUIDPipe) mascotaId: string,
  ): Promise<HistoriaClinica[]> {
    return this.mascotaService.findHistoriasByMascota(mascotaId);
  }

  @Get('historias-clinicas/:id')
  @ApiOperation({ summary: 'Obtener una historia clínica por ID' })
  @ApiResponse({
    status: 200,
    description: 'Historia clínica obtenida exitosamente',
    type: HistoriaClinica,
  })
  @ApiResponse({ status: 404, description: 'Historia clínica no encontrada' })
  findOneHistoriaClinica(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<HistoriaClinica> {
    return this.mascotaService.findOneHistoriaClinica(id);
  }

  @Patch('historias-clinicas/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.VETERINARIO)
  @ApiOperation({ summary: 'Actualizar una historia clínica' })
  @ApiResponse({
    status: 200,
    description: 'Historia clínica actualizada exitosamente',
    type: HistoriaClinica,
  })
  @ApiResponse({ status: 404, description: 'Historia clínica no encontrada' })
  updateHistoriaClinica(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateHistoriaClinicaDto,
  ): Promise<HistoriaClinica> {
    return this.mascotaService.updateHistoriaClinica(id, updateDto);
  }

  @Delete('historias-clinicas/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Eliminar una historia clínica' })
  @ApiResponse({
    status: 200,
    description: 'Historia clínica eliminada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Historia clínica no encontrada' })
  removeHistoriaClinica(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mascotaService.removeHistoriaClinica(id);
  }

  @Post('vacunas')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.VETERINARIO)
  @ApiOperation({ summary: 'Registrar una nueva vacuna' })
  @ApiResponse({
    status: 201,
    description: 'Vacuna registrada exitosamente',
    type: Vacuna,
  })
  createVacuna(@Body() createDto: CreateVacunaDto): Promise<Vacuna> {
    return this.mascotaService.createVacuna(createDto);
  }

  @Get('vacunas')
  @ApiOperation({ summary: 'Obtener todas las vacunas' })
  @ApiResponse({
    status: 200,
    description: 'Vacunas obtenidas exitosamente',
    type: [Vacuna],
  })
  findAllVacunas(): Promise<Vacuna[]> {
    return this.mascotaService.findAllVacunas();
  }

  @Get('vacunas/historia/:historiaClinicaId')
  @ApiOperation({ summary: 'Obtener vacunas por historia clínica' })
  @ApiResponse({
    status: 200,
    description: 'Vacunas obtenidas exitosamente',
    type: [Vacuna],
  })
  findVacunasByHistoriaClinica(
    @Param('historiaClinicaId', ParseUUIDPipe) historiaClinicaId: string,
  ): Promise<Vacuna[]> {
    return this.mascotaService.findVacunasByHistoriaClinica(historiaClinicaId);
  }

  @Get('vacunas/:id')
  @ApiOperation({ summary: 'Obtener una vacuna por ID' })
  @ApiResponse({
    status: 200,
    description: 'Vacuna obtenida exitosamente',
    type: Vacuna,
  })
  @ApiResponse({ status: 404, description: 'Vacuna no encontrada' })
  findOneVacuna(@Param('id', ParseUUIDPipe) id: string): Promise<Vacuna> {
    return this.mascotaService.findOneVacuna(id);
  }

  @Patch('vacunas/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.VETERINARIO)
  @ApiOperation({ summary: 'Actualizar una vacuna' })
  @ApiResponse({
    status: 200,
    description: 'Vacuna actualizada exitosamente',
    type: Vacuna,
  })
  @ApiResponse({ status: 404, description: 'Vacuna no encontrada' })
  updateVacuna(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateVacunaDto,
  ): Promise<Vacuna> {
    return this.mascotaService.updateVacuna(id, updateDto);
  }

  @Delete('vacunas/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Eliminar una vacuna' })
  @ApiResponse({ status: 200, description: 'Vacuna eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Vacuna no encontrada' })
  removeVacuna(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mascotaService.removeVacuna(id);
  }

  @Post('medicamentos')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.VETERINARIO)
  @ApiOperation({ summary: 'Registrar un nuevo medicamento' })
  @ApiResponse({
    status: 201,
    description: 'Medicamento registrado exitosamente',
    type: Medicamento,
  })
  createMedicamento(
    @Body() createDto: CreateMedicamentoDto,
  ): Promise<Medicamento> {
    return this.mascotaService.createMedicamento(createDto);
  }

  @Get('medicamentos')
  @ApiOperation({ summary: 'Obtener todos los medicamentos' })
  @ApiResponse({
    status: 200,
    description: 'Medicamentos obtenidos exitosamente',
    type: [Medicamento],
  })
  findAllMedicamentos(): Promise<Medicamento[]> {
    return this.mascotaService.findAllMedicamentos();
  }

  @Get('medicamentos/historia/:historiaClinicaId')
  @ApiOperation({ summary: 'Obtener medicamentos por historia clínica' })
  @ApiResponse({
    status: 200,
    description: 'Medicamentos obtenidos exitosamente',
    type: [Medicamento],
  })
  findMedicamentosByHistoriaClinica(
    @Param('historiaClinicaId', ParseUUIDPipe) historiaClinicaId: string,
  ): Promise<Medicamento[]> {
    return this.mascotaService.findMedicamentosByHistoriaClinica(
      historiaClinicaId,
    );
  }

  @Get('medicamentos/:id')
  @ApiOperation({ summary: 'Obtener un medicamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Medicamento obtenido exitosamente',
    type: Medicamento,
  })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  findOneMedicamento(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Medicamento> {
    return this.mascotaService.findOneMedicamento(id);
  }

  @Patch('medicamentos/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN, RoleType.VETERINARIO)
  @ApiOperation({ summary: 'Actualizar un medicamento' })
  @ApiResponse({
    status: 200,
    description: 'Medicamento actualizado exitosamente',
    type: Medicamento,
  })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  updateMedicamento(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateMedicamentoDto,
  ): Promise<Medicamento> {
    return this.mascotaService.updateMedicamento(id, updateDto);
  }

  @Delete('medicamentos/:id')
  @UseGuards(RolesGuard)
  @Roles(RoleType.ADMIN)
  @ApiOperation({ summary: 'Eliminar un medicamento' })
  @ApiResponse({
    status: 200,
    description: 'Medicamento eliminado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Medicamento no encontrado' })
  removeMedicamento(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mascotaService.removeMedicamento(id);
  }
}
