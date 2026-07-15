import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
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



@UseGuards(JwtAuthGuard)
@Get("dashboard")
dashboard(@Request() req) {
  return this.providerService.getDashboard(req.user.id);
}

@UseGuards(JwtAuthGuard)
@Get("my-service")
getMyService(@Request() req) {
  return this.providerService.getMyService(req.user.id);
}

@Delete("service/:id")
@UseGuards(JwtAuthGuard)
deleteService(@Param("id") id: string) {
  return this.providerService.deleteService(id);
}

@UseGuards(JwtAuthGuard)
@Patch("service")
updateService(@Request() req, @Body() dto: any) {
  return this.providerService.updateService(req.user.id, dto);
}

@UseGuards(JwtAuthGuard)
@Get("bookings")
getMyBookings(@Request() req) {
  return this.providerService.getMyBookings(req.user.id);
}

@UseGuards(JwtAuthGuard)
@Patch("booking/:id/accept")
acceptBooking(@Param("id") id: string) {
  return this.providerService.acceptBooking(id);
}

@UseGuards(JwtAuthGuard)
@Patch("booking/:id/reject")
rejectBooking(@Param("id") id: string) {
  return this.providerService.rejectBooking(id);
}

@Get(":id")
getProvider(@Param("id") id: string) {
  return this.providerService.getProviderById(id);
}
}