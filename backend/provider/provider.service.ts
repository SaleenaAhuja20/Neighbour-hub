import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  constructor(private prisma: PrismaService) {}

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

      return this.prisma.provider.update({
        where: {
          userId,
        },
        data: {
          serviceTitle: dto.serviceTitle,
          category: dto.category,
          experience: dto.experience,
          phone: dto.phone,
          address: dto.address,
          description: dto.description,
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

  async editProvider(
    userId: string,
    dto: UpdateProviderDto,
  ) {
    const provider = await this.prisma.provider.findUnique({
      where: {
        userId,
      },
    });

    if (!provider) {
      throw new NotFoundException(
        'Provider profile not found',
      );
    }

    return this.prisma.provider.update({
      where: {
        userId,
      },
      data: {
        serviceTitle: dto.serviceTitle,
        category: dto.category,
        experience: dto.experience,
        phone: dto.phone,
        address: dto.address,
        description: dto.description,
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
    const provider = await this.prisma.provider.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    const application = await this.prisma.provider.update({
      where: {
        id,
      },
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
    const provider = await this.prisma.provider.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    const application = await this.prisma.provider.update({
      where: {
        id,
      },
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

  // New method added
  async updateProvider(
    id: string,
    data: any,
  ) {
    const provider = await this.prisma.provider.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    return this.prisma.provider.update({
      where: { id },
      data,
    });
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
}