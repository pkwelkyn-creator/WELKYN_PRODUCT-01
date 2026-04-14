import type { Finding, ScoreResult, SeverityType } from './analysis.types';

export interface Tier1Report {
  overview: {
    estimatedMonthlyWaste: { min: number; max: number };
    totalResourcesScanned: number;
    providersScanned: string[];
    scanDate: string;
  };
  scores: ScoreResult;
  topIssues: Array<{
    title: string;
    severity: SeverityType;
    category: string;
    provider: string;
    potentialSavings: 'HIGH' | 'MEDIUM' | 'LOW';
  }>;
  callToAction: {
    message: string;
    upgradeUrl: string;
  };
}

export interface Tier2Report {
  executiveSummary: {
    totalMonthlySpend: number;
    totalPotentialSavings: number;
    implementationEffort: 'LOW' | 'MEDIUM' | 'HIGH';
    topRecommendation: string;
    aiSummary?: string;
  };
  findings: Finding[];
  savingsBreakdown: Array<{
    category: string;
    provider: string;
    currentCost: number;
    optimizedCost: number;
    savings: number;
    confidence: string;
    effort: string;
  }>;
  recommendations: Array<{
    priority: number;
    title: string;
    description: string;
    steps: string[];
    terraformSnippet?: string;
    estimatedSavings: number;
    implementationTime: string;
    aiInsight?: string;
  }>;
  cloudflareConfigChanges?: Array<{
    type: 'cache_rule' | 'page_rule' | 'argo' | 'tiered_cache' | 'dns';
    action: 'create' | 'modify' | 'delete';
    currentConfig?: Record<string, unknown>;
    recommendedConfig: Record<string, unknown>;
    reason: string;
  }>;
}
