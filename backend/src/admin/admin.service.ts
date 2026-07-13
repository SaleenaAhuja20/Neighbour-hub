import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {

    const totalUsers = await this.prisma.user.count();

    const totalProviders =
      await this.prisma.provider.count({
        where: {
          status: "APPROVED",
        },
      });

    const pendingRequests =
      await this.prisma.provider.count({
        where: {
          status: "PENDING",
        },
      });

    const latestUsers =
      await this.prisma.user.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
      });

    const pendingApplications =
      await this.prisma.provider.findMany({
        where: {
          status: "PENDING",
        },

        include: {
          user: true,
        },

        take: 5,

        orderBy: {
          createdAt: "desc",
        },
      });

    return {
      totalUsers,
      totalProviders,
      pendingRequests,
      latestUsers,
      pendingApplications,
    };
  }
}