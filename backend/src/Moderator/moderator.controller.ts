import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';

@Controller('moderator')
export class ModeratorController {
  constructor(
    private readonly moderatorService: ModeratorService,
  ) {}

  @Get('dashboard')
  dashboard() {
    return this.moderatorService.getDashboard();
  }

  @Get('disputes')
  getDisputes() {
    return this.moderatorService.getDisputes();
  }

  @Get('disputes/:id')
  getDispute(@Param('id', ParseIntPipe) id: number) {
    return this.moderatorService.getDisputeById(id);
  }

  @Get('flagged-content')
  getFlaggedContent() {
    return this.moderatorService.getFlaggedContent();
  }

  @Get('conversations')
  getConversations() {
    return this.moderatorService.getConversations();
  }

  @Get('profile')
  getProfile() {
    return this.moderatorService.getProfile();
  }

  @Patch('profile')
  updateProfile(@Body() body: any) {
    return this.moderatorService.updateProfile(body);
  }

  @Get('settings')
  getSettings() {
    return this.moderatorService.getSettings();
  }

  @Patch('settings')
  updateSettings(@Body() body: any) {
    return this.moderatorService.updateSettings(body);
  }
}