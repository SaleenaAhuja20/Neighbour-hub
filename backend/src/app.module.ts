import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProviderModule } from './provider/provider.module';
import { AdminModule } from './admin/admin.module';
import { ModeratorModule } from './Moderator/moderator.module';
import { AiModule } from './ai/ai.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    ProviderModule,
    AdminModule,
     ModeratorModule,
    AiModule,
    BookingModule,
  ],
})
export class AppModule {}
