export const SCORING = {
  // Waste score thresholds
  WASTE_MULTIPLIER: 200,
  WASTE_MAX: 100,

  // Cache hit ratio thresholds
  CACHE_EXCELLENT_THRESHOLD: 90,
  CACHE_GOOD_THRESHOLD: 70,
  CACHE_POOR_THRESHOLD: 50,

  // Traffic efficiency thresholds
  TRAFFIC_EXCELLENT_THRESHOLD: 85,
  TRAFFIC_GOOD_THRESHOLD: 65,

  // Composite score weights (must sum to 1)
  WEIGHT_WASTE: 0.5,
  WEIGHT_CACHE: 0.25,
  WEIGHT_TRAFFIC: 0.25,

  // EC2 rightsizing thresholds
  EC2_AVG_CPU_LOW: 20,
  EC2_P95_CPU_LOW: 40,
  EC2_MIN_OBSERVATION_DAYS: 14,

  // NAT Gateway threshold (GB/month)
  NAT_HIGH_THROUGHPUT_GB: 100,

  // Tier 1 report: top N issues
  TIER1_TOP_ISSUES: 3,
} as const;
