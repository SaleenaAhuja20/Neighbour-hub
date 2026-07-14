import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Request,
  UseGuards,
} from "@nestjs/common";

import { BookingService } from "./booking.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Controller("booking")
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":providerId")
  createBooking(
    @Request() req,
    @Param("providerId") providerId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingService.createBooking(
      req.user.id,
      providerId,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("my")
  getMyBookings(@Request() req) {
    return this.bookingService.getResidentBookings(req.user.id);
  }
}