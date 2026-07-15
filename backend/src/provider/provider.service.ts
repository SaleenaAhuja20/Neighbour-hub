import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProviderDto } from './dto/create-provider.dto';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) { }

  async apply(userId: string, dto: CreateProviderDto) {
    const existingApplication = await this.prisma.provider.findUnique({
      where: {
        userId,
      },
    });

    if (existingApplication) {
      if (existingApplication.status === 'PENDING') {
        throw new BadRequestException(
          'You already have a pending application.',
        );
      }

      if (existingApplication.status === 'APPROVED') {
        throw new BadRequestException(
          'You are already an approved provider.',
        );
      }

      // Reapply
      return this.prisma.provider.update({
        where: { userId },
        data: {
          serviceTitle: dto.serviceTitle,
          category: dto.category,
          experience: dto.experience,
          phone: dto.phone,
          address: dto.address,
          description: dto.description,
          serviceFee: dto.serviceFee,
          status: 'PENDING',
        },
      });
    }

    return this.prisma.provider.create({
      data: {
        userId,
        serviceTitle: dto.serviceTitle,
        category: dto.category,
        experience: dto.experience,
        phone: dto.phone,
        address: dto.address,
        description: dto.description,
        serviceFee: dto.serviceFee,
        status: 'PENDING',
      },
    });
  }

  async getMyApplication(userId: string) {
    return this.prisma.provider.findUnique({
      where: {
        userId,
      },
    });
  }

  async getAllApplications() {
    return this.prisma.provider.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async approveApplication(id: string) {
    const application = await this.prisma.provider.update({
      where: { id },
      data: {
        status: 'APPROVED',
      },
    });

    await this.prisma.user.update({
      where: {
        id: application.userId,
      },
      data: {
        role: 'PROVIDER',
      },
    });

    return {
      message: 'Application approved successfully',
    };
  }

  async rejectApplication(id: string) {
    const application = await this.prisma.provider.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
    });

    await this.prisma.user.update({
      where: {
        id: application.userId,
      },
      data: {
        role: 'RESIDENT',
      },
    });

    return {
      message: 'Application rejected successfully',
    };
  }

  async getAllProviders() {
    return this.prisma.provider.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getApprovedProviders() {
    return this.prisma.provider.findMany({
      where: {
        status: 'APPROVED',
      },
      include: {
        user: true,
      },
    });
  }

  async getProviderById(id: string) {
    const provider = await this.prisma.provider.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!provider) {
      throw new BadRequestException('Provider not found');
    }

    return provider;
  }

  async getDashboard(userId: string) {
    const provider = await this.prisma.provider.findUnique({
      where: {
        userId,
      },
    });

    if (!provider) {
      throw new Error("Provider not found");
    }

    const totalBookings = await this.prisma.booking.count({
      where: {
        providerId: provider.id,
      },
    });

    const pendingBookings = await this.prisma.booking.count({
      where: {
        providerId: provider.id,
        status: "PENDING",
      },
    });

    const completedBookings = await this.prisma.booking.count({
      where: {
        providerId: provider.id,
        status: "COMPLETED",
      },
    });

    const services = 1; // each provider has one service currently

    const recentBookings = await this.prisma.booking.findMany({
      where: {
        providerId: provider.id,
      },
      include: {
        resident: {
          select: {
            fullName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return {
      totalBookings,
      pendingBookings,
      completedBookings,
      activeServices: services,
      recentBookings,
    };
  }
  async getMyService(userId: string) {
    return this.prisma.provider.findUnique({
      where: {
        userId,
      },
    });
  }

  async deleteService(id: string) {
    return this.prisma.provider.delete({
      where: {
        id,
      },
    });
  }

  async updateService(userId: string, dto: any) {
    return this.prisma.provider.update({
      where: {
        userId,
      },
      data: {
        serviceTitle: dto.serviceTitle,
        category: dto.category,
        serviceFee: dto.serviceFee,
        description: dto.description,
      },
    });
  }

  async getMyBookings(userId: string) {
    const provider = await this.prisma.provider.findUnique({
      where: {
        userId,
      },
    });

    if (!provider) {
      throw new BadRequestException("Provider not found");
    }

    return this.prisma.booking.findMany({
      where: {
        providerId: provider.id,
      },
      include: {
        resident: {
          select: {
            fullName: true,
            email: true,
          },
        },
        provider: {
          select: {
            serviceTitle: true,
          },
        },
      },
      orderBy: {
        bookingDate: "desc",
      },
    });
  }

  async acceptBooking(id: string) {
  return this.prisma.booking.update({
    where: {
      id,
    },
    data: {
      status: "ACCEPTED",
    },
  });
}

async rejectBooking(id: string) {
  return this.prisma.booking.update({
    where: {
      id,
    },
    data: {
      status: "CANCELLED",
    },
  });
}
}