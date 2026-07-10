import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProviderDto } from './dto/create-provider.dto';

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
      throw new BadRequestException(
        "You have already submitted a provider application.",
      );
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
        status: "PENDING",
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
        createdAt: "desc",
      },
    });

  }

  async approveApplication(id: string) {

    const application = await this.prisma.provider.update({
      where: { id },
      data: {
        status: "APPROVED",
      },
    });

    await this.prisma.user.update({
      where: {
        id: application.userId,
      },
      data: {
        role: "PROVIDER",
      },
    });

    return {
      message: "Application approved successfully",
    };

  }

}