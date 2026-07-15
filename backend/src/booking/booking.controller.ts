import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
  ) {}

  // ============================
  // Resident creates booking
  // ============================
  @UseGuards(JwtAuthGuard)
  @Post(':providerId')
  createBooking(
    @Request() req,
    @Param('providerId') providerId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingService.createBooking(
      req.user.id,
      providerId,
      dto,
    );
  }



  // ============================
  // Resident views own bookings
  // ============================
  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyBookings(@Request() req) {
    return this.bookingService.getResidentBookings(
      req.user.id,
    );
  }

  // ============================
  // Provider views assigned bookings
  // ============================
  @UseGuards(JwtAuthGuard)
  @Get('provider')
  getProviderBookings(@Request() req) {
    return this.bookingService.getProviderBookings(
      req.user.id,
    );
  }

  // ============================
  // Provider accepts booking
  // ============================
  @UseGuards(JwtAuthGuard)
  @Patch(':bookingId/accept')
  acceptBooking(
    @Request() req,
    @Param('bookingId') bookingId: string,
  ) {
    return this.bookingService.updateBookingStatus(
      req.user.id,
      bookingId,
      'ACCEPTED',
    );
  }

  // ============================
  // Provider rejects booking
  // ============================
  @UseGuards(JwtAuthGuard)
  @Patch(':bookingId/reject')
  rejectBooking(
    @Request() req,
    @Param('bookingId') bookingId: string,
  ) {
    return this.bookingService.updateBookingStatus(
      req.user.id,
      bookingId,
      'CANCELLED',
    );
  }

  // ============================
  // Provider completes booking
  // ============================
  @UseGuards(JwtAuthGuard)
  @Patch(':bookingId/complete')
  completeBooking(
    @Request() req,
    @Param('bookingId') bookingId: string,
  ) {
    return this.bookingService.updateBookingStatus(
      req.user.id,
      bookingId,
      'COMPLETED',
    );
  }

  // ============================
  // Admin views all bookings
  // ============================
  @UseGuards(JwtAuthGuard)
@Get()
getAllBookings() {
    return this.bookingService.getAllBookings();
}


  // ============================
// Resident views single booking details
// ============================
@UseGuards(JwtAuthGuard)
@Get(':id')
getBookingById(
  @Param('id') id: string,
) {
  return this.bookingService.getBookingById(id);
}
}