import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";

import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
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
  @Get("my-application")
  getMyApplication(@Request() req) {
    return this.providerService.getMyApplication(req.user.id);
  }
  @Get("applications")
async applications() {
  return this.providerService.getAllApplications();
}

@Patch("approve/:id")
async approve(
  @Param("id") id: string,
) {
  return this.providerService.approveApplication(id);
}

@Patch("reject/:id")
async reject(
  @Param("id") id: string,
) {
  return this.providerService.rejectApplication(id);
}

@Get()
getAllProviders() {
  return this.providerService.getAllProviders();
}

@Get("approved")
getApprovedProviders() {
  return this.providerService.getApprovedProviders();
}
}