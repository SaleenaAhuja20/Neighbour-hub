import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  EnhanceDescriptionDto,
  MatchProviderDto,
  AnalyzeSentimentDto,
} from './dto/ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // Provider writes a rough description -> polished listing
  @UseGuards(JwtAuthGuard)
  @Post('enhance-description')
  enhanceDescription(@Body() dto: EnhanceDescriptionDto) {
    return this.aiService.enhanceDescription(dto);
  }

  // Resident describes their need -> ranked provider matches
  @UseGuards(JwtAuthGuard)
  @Post('match-providers')
  matchProviders(@Body() dto: MatchProviderDto) {
    return this.aiService.matchProviders(dto);
  }

  // Aggregate reviews for a provider -> trust profile
  @UseGuards(JwtAuthGuard)
  @Post('analyze-sentiment')
  analyzeSentiment(@Body() dto: AnalyzeSentimentDto) {
    return this.aiService.analyzeSentiment(dto);
  }
@Post('review')
review(@Body('text') text: string) {
  return this.aiService.reviewAnalysis(text);
}

@Post('match')
match(@Body() body: any) {
  return this.aiService.smartMatch(
    body.requirements,
    body.providers,
  );
}

@Post('enhance')
enhance(@Body('text') text: string) {
  return this.aiService.enhanceSimpleDescription(text);
}

}
