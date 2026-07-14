import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('dashboard')
  getDashboard() {
    return this.adminService.getDashboard();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('users')
  getUsers() {
    return this.adminService.getUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete('users/:id')
  deleteUser(
    @Param('id') id: string,
  ) {
    return this.adminService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get('bookings')
getBookings() {
  return this.adminService.getBookings();
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Patch('bookings/:id/cancel')
cancel(
  @Param('id') id: string,
) {
  return this.adminService.cancelBooking(id);
}
}