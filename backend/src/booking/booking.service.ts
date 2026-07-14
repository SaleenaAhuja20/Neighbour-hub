import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable()
export class BookingService {

  constructor(private prisma: PrismaService) {}

  async createBooking(
    residentId: string,
    providerId: string,
    dto: CreateBookingDto,
  ) {

    const provider = await this.prisma.provider.findUnique({
      where: {
        id: providerId,
      },
    });

    if (!provider) {
      throw new NotFoundException("Provider not found");
    }

    return this.prisma.booking.create({
      data: {
        residentId,
        providerId,

        bookingDate: new Date(dto.bookingDate),

        address: dto.address,

        notes: dto.notes,
      },
    });

  }

  async getResidentBookings(residentId: string) {

    return this.prisma.booking.findMany({

      where: {
        residentId,
      },

      include: {
        provider: {
          include: {
            user: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

    });

  }

  async getProviderBookings(providerId: string) {

    return this.prisma.booking.findMany({

      where: {
        providerId,
      },

      include: {
        resident: true,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

  }

}