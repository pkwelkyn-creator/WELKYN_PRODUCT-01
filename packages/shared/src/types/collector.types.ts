export interface CollectionError {
  collector: string;
  message: string;
  code?: string;
  retryable: boolean;
}

export interface CollectionMetadata {
  apiCallCount: number;
  durationMs: number;
  errors: CollectionError[];
}

export interface CollectionResult<T> {
  tenantId: string;
  collectorName: string;
  provider: 'AWS' | 'AZURE' | 'GCP' | 'CLOUDFLARE';
  collectedAt: Date;
  data: T;
  metadata: CollectionMetadata;
}
