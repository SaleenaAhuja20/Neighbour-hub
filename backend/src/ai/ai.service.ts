import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import {
  EnhanceDescriptionDto,
  MatchProviderDto,
  AnalyzeSentimentDto,
} from './dto/ai.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly client: OpenAI;

  constructor() {
    // Requires OPENAI_API_KEY in your .env — never hardcode it, never call this from the frontend directly.
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Shared low-level call. Returns null on any failure (timeout, bad key,
   * malformed response) so every feature above it can fall back gracefully
   * instead of crashing the request.
   */
  private async callLLM(systemPrompt: string, userPrompt: string): Promise<any | null> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        temperature: 0.4,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      });

      const raw = response.choices[0]?.message?.content;
      if (!raw) return null;

      return JSON.parse(raw);
    } catch (err) {
      this.logger.error('AI call failed, falling back', err as Error);
      return null;
    }
  }

  // ===================== AI Feature 1: Service Description Enhancer =====================

  async enhanceDescription(dto: EnhanceDescriptionDto) {
    const systemPrompt = `You are a professional copywriter for a neighbourhood services marketplace.
Rewrite the provider's rough description into a polished, search-optimised listing.
Respond ONLY with JSON in this exact shape:
{
  "summary": "2 sentence service summary",
  "included": ["3 to 5 short bullet points of what's included"],
  "expect": "1 paragraph describing what the customer can expect",
  "cta": "1 sentence closing call-to-action"
}`;

    const userPrompt = `Category: ${dto.category}
Rough description: ${dto.roughDescription}
Unique selling points: ${dto.uniqueSellingPoints || 'none mentioned'}`;

    const result = await this.callLLM(systemPrompt, userPrompt);

    if (result) {
      return { source: 'ai', ...result };
    }

    // Fallback per spec: publish the original text with a basic template applied
    return {
      source: 'fallback',
      summary: dto.roughDescription.slice(0, 160),
      included: [],
      expect: dto.roughDescription,
      cta: 'Book this service today.',
    };
  }

  // ===================== AI Feature 2: Smart Provider Matcher =====================

  async matchProviders(dto: MatchProviderDto) {
    if (!dto.candidates || dto.candidates.length === 0) {
      return { source: 'fallback', matches: [] };
    }

    const systemPrompt = `You are a matching assistant for a neighbourhood services marketplace.
Given a resident's need and a list of candidate providers, pick and rank up to 5 best matches
considering skills, availability, zone proximity, and review sentiment implied by their bio/reviewsSummary.
Respond ONLY with JSON in this exact shape:
{
  "matches": [
    { "providerId": "id", "matchExplanation": "1 short personalised sentence explaining why this provider fits" }
  ]
}
Order best match first. Do not include providers that clearly don't fit.`;

    const userPrompt = `Resident's need: ${dto.needDescription}
Resident's zone: ${dto.zone}
Preferred timing: ${dto.preferredTiming || 'no preference'}

Candidate providers:
${JSON.stringify(dto.candidates, null, 2)}`;

    const result = await this.callLLM(systemPrompt, userPrompt);

    if (result?.matches) {
      return { source: 'ai', matches: result.matches };
    }

    // Fallback per spec: plain keyword search ranked by proximity/zone match
    const fallbackMatches = dto.candidates
      .filter((c) => c.zone === dto.zone)
      .slice(0, 5)
      .map((c) => ({
        providerId: c.id,
        matchExplanation: `${c.name} is in your zone (${c.zone}).`,
      }));

    return { source: 'fallback', matches: fallbackMatches };
  }

  // ===================== AI Feature 3: Review Sentiment Analyser =====================

  async analyzeSentiment(dto: AnalyzeSentimentDto) {
    if (!dto.reviews || dto.reviews.length < 3) {
      // Spec: minimum 3 reviews to activate AI synthesis
      return {
        source: 'fallback',
        activated: false,
        message: 'Not enough reviews yet to generate a trust profile (minimum 3 required).',
      };
    }

    const systemPrompt = `You analyse a service provider's customer reviews and produce a structured trust profile.
Respond ONLY with JSON in this exact shape:
{
  "positiveThemes": ["up to 3 short recurring positive themes"],
  "recurringComplaints": ["any recurring complaints, or empty array if none"],
  "reliabilityScore": 0,
  "summary": "2 sentence overall summary"
}
reliabilityScore must be an integer between 0 and 100.`;

    const userPrompt = `Reviews:\n${dto.reviews.map((r, i) => `${i + 1}. ${r}`).join('\n')}`;

    const result = await this.callLLM(systemPrompt, userPrompt);

    if (result) {
      return { source: 'ai', activated: true, ...result };
    }

    // Fallback per spec: no AI synthesis, just raw review count
    return {
      source: 'fallback',
      activated: false,
      message: 'AI analysis unavailable — showing raw review count only.',
      reviewCount: dto.reviews.length,
    };
  }
}