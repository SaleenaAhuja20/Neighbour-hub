import {
  Controller,
  Get,
  Request,
  UseGuards,
  Delete,
  Patch,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      message: 'Profile fetched successfully',
      user: req.user,
    };
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Patch('block/:id')
  blockUser(@Param('id') id: string) {
    return this.usersService.blockUser(id);
  }

  @Patch('unblock/:id')
  unblockUser(@Param('id') id: string) {
    return this.usersService.unblockUser(id);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(id, body);
  }
  @Get('providers')
  getProviders() {
    return this.usersService.getProviders();
  }
}
