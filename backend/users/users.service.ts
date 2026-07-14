import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { fullName: string; email: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async deleteUser(id: string) {
    try {
      console.log('Deleting user:', id);

      await this.prisma.provider.deleteMany({
        where: {
          userId: id,
        },
      });

      const deleted = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      console.log('Deleted successfully');
      return deleted;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async blockUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        status: 'BLOCKED',
      },
    });
  }

  async unblockUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        status: 'ACTIVE',
      },
    });
  }
  async updateUser(
    id: string,
    data: {
      fullName: string;
      email: string;
      role: string;
    },
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        fullName: data.fullName,
        email: data.email,
        role: data.role as any,
      },
    });
  }
  async getProviders() {
    return this.prisma.user.findMany({
      where: {
        role: 'PROVIDER',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
