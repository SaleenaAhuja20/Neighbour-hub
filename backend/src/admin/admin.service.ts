import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const totalUsers = await this.prisma.user.count();

    const totalResidents = await this.prisma.user.count({
      where: {
        role: 'RESIDENT',
      },
    });

    const totalProviders = await this.prisma.provider.count({
      where: {
        status: 'APPROVED',
      },
    });

    const pendingProviders = await this.prisma.provider.count({
      where: {
        status: 'PENDING',
      },
    });

    const rejectedProviders = await this.prisma.provider.count({
      where: {
        status: 'REJECTED',
      },
    });

    const totalBookings = await this.prisma.booking.count();

    const pendingBookings = await this.prisma.booking.count({
      where: {
        status: 'PENDING',
      },
    });

    const acceptedBookings = await this.prisma.booking.count({
      where: {
        status: 'ACCEPTED',
      },
    });

    const completedBookings = await this.prisma.booking.count({
      where: {
        status: 'COMPLETED',
      },
    });

    const cancelledBookings = await this.prisma.booking.count({
      where: {
        status: 'CANCELLED',
      },
    });

    const latestUsers = await this.prisma.user.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const pendingApplications = await this.prisma.provider.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        user: true,
      },
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      totalUsers,
      totalResidents,
      totalProviders,
      pendingProviders,
      rejectedProviders,

      totalBookings,
      pendingBookings,
      acceptedBookings,
      completedBookings,
      cancelledBookings,

      latestUsers,
      pendingApplications,
    };
  }

  // Get all users
  async getUsers() {
    return this.prisma.user.findMany();
  }

  // Delete user
  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  // Get all bookings
async getBookings() {
  return this.prisma.booking.findMany({
    include: {
      
      provider: true,
    },
  });
}

// Cancel booking
async cancelBooking(id: string) {
  return this.prisma.booking.update({
    where: {
      id,
    },
    data: {
      status: 'CANCELLED',
    },
  });
}

async getAllBookings() {

  const bookings = await this.prisma.booking.findMany({

    include:{
      resident:{
        select:{
          fullName:true,
          email:true
        }
      },

      provider:{
        select:{
          serviceTitle:true,
          user:{
            select:{
              fullName:true
            }
          }
        }
      }

    },

    orderBy:{
      createdAt:"desc"
    }

  });


  return bookings.map((booking)=>({

    id: booking.id,

    customer: booking.resident.fullName,

    service: booking.provider.serviceTitle,

    provider: booking.provider.user.fullName,

    status: booking.status,

    date: booking.bookingDate

  }));

}
}