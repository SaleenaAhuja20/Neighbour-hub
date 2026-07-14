import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('provider')
export class ProviderController {
  constructor(
    private readonly providerService: ProviderService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('apply')
  async apply(
    @Request() req,
    @Body() dto: CreateProviderDto,
  ) {
    return this.providerService.apply(
      req.user.id,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-application')
  getMyApplication(@Request() req) {
    return this.providerService.getMyApplication(
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit')
  editProvider(
    @Request() req,
    @Body() dto: UpdateProviderDto,
  ) {
    return this.providerService.editProvider(
      req.user.id,
      dto,
    );
  }

  @Get('applications')
  getApplications() {
    return this.providerService.getAllApplications();
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.providerService.approveApplication(id);
  }

  @Patch('reject/:id')
  reject(@Param('id') id: string) {
    return this.providerService.rejectApplication(id);
  }

  // New Update Provider API
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.providerService.updateProvider(
      id,
      body,
    );
  }

  @Get()
  getAllProviders() {
    return this.providerService.getAllProviders();
  }

  @Get('approved')
  getApprovedProviders() {
    return this.providerService.getApprovedProviders();
  }
}