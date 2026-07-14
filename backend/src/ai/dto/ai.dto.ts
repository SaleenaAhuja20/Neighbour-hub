export class EnhanceDescriptionDto {
  roughDescription!: string;
  category!: string;
  uniqueSellingPoints?: string;
}

export interface ProviderCandidate {
  id: string;
  name: string;
  category: string;
  zone: string;
  bio?: string;
  availability?: string;
  reviewsSummary?: string; // e.g. "4.8 avg, 12 reviews, mentions punctuality"
}

export class MatchProviderDto {
  needDescription!: string;
  zone!: string;
  preferredTiming?: string;
  candidates!: ProviderCandidate[]; // supplied by caller (frontend/backend already has the provider list)
}

export class AnalyzeSentimentDto {
  reviews!: string[]; // raw review text, minimum 3 to activate AI synthesis
}
