import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  // ===================================
  // Resident creates booking
  // ===================================
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
      throw new NotFoundException(
        'Provider not found',
      );
    }

    return this.prisma.booking.create({
      data: {
        residentId,
        providerId,
        bookingDate: new Date(dto.bookingDate),
        address: dto.address,
        notes: dto.notes,
        status: 'PENDING',
      },
    });
  }

  // ===================================
  // Resident views own bookings
  // ===================================
  async getResidentBookings(
    residentId: string,
  ) {
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
        createdAt: 'desc',
      },
    });
  }

  // ===================================
  // Provider views assigned bookings
  // ===================================
  async getProviderBookings(userId: string) {
    const provider =
      await this.prisma.provider.findUnique({
        where: {
          userId,
        },
      });

    if (!provider) {
      throw new NotFoundException(
        'Provider profile not found',
      );
    }

    return this.prisma.booking.findMany({
      where: {
        providerId: provider.id,
      },

      include: {
        resident: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },

      orderBy: {
        bookingDate: 'desc',
      },
    });
  }

  // ===================================
  // Admin views all bookings
  // ===================================
  async getAllBookings() {
    return this.prisma.booking.findMany({
      include: {
        resident: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },

        provider: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ===================================
  // Provider updates booking status
  // ===================================
  async updateBookingStatus(
    userId: string,
    bookingId: string,
    status:
      | 'ACCEPTED'
      | 'CANCELLED'
      | 'COMPLETED',
  ) {
    const provider =
      await this.prisma.provider.findUnique({
        where: {
          userId,
        },
      });

    if (!provider) {
      throw new NotFoundException(
        'Provider profile not found',
      );
    }

    const booking =
      await this.prisma.booking.findUnique({
        where: {
          id: bookingId,
        },
      });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    // Ensure provider owns the booking
    if (booking.providerId !== provider.id) {
      throw new ForbiddenException(
        'You are not authorized to update this booking',
      );
    }

    // Validate status transitions
    switch (status) {
      case 'ACCEPTED':
        if (booking.status !== 'PENDING') {
          throw new BadRequestException(
            'Only pending bookings can be accepted',
          );
        }
        break;

      case 'CANCELLED':
        if (
          booking.status === 'COMPLETED' ||
          booking.status === 'CANCELLED'
        ) {
          throw new BadRequestException(
            'Booking cannot be cancelled',
          );
        }
        break;

      case 'COMPLETED':
        if (
          booking.status !== 'ACCEPTED'
        ) {
          throw new BadRequestException(
            'Only accepted bookings can be completed',
          );
        }
        break;
    }

    return this.prisma.booking.update({
      where: {
        id: bookingId,
      },

      data: {
        status,
      },
    });
  }
}