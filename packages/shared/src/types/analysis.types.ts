export type SeverityType = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
export type ConfidenceType = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Finding<T = Record<string, unknown>> {
  id: string;
  provider: 'AWS' | 'AZURE' | 'GCP' | 'CLOUDFLARE';
  category: string;
  severity: SeverityType;
  title: string;
  description: string;
  currentMonthlyCost: number;
  estimatedMonthlySavings: number;
  confidence: ConfidenceType;
  recommendation: string;
  terraformSuggestion?: string;
  aiInsight?: string;
  details: T;
}

export interface AnalysisContext {
  tenantId: string;
  scanId: string;
  providers: string[];
}

export interface Analyzer<TInput, TFinding> {
  name: string;
  provider: string;
  analyze(input: TInput, context: AnalysisContext): Promise<Finding<TFinding>[]>;
}

export interface ScoreResult {
  wasteScore: number;
  cacheHitScore: number;
  trafficEfficiencyScore: number;
  compositeScore: number;
}
