export const AWS_REGIONS = [
  'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'ap-south-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'ap-northeast-2', 'ap-northeast-3',
  'ca-central-1',
  'eu-central-1', 'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-north-1',
  'sa-east-1',
  'me-south-1',
  'af-south-1',
] as const;

export const AZURE_REGIONS = [
  'eastus', 'eastus2', 'westus', 'westus2', 'westus3',
  'centralus', 'northcentralus', 'southcentralus',
  'westeurope', 'northeurope', 'uksouth', 'ukwest',
  'southeastasia', 'eastasia', 'japaneast', 'japanwest',
  'australiaeast', 'australiasoutheast',
  'centralindia', 'southindia', 'westindia',
  'brazilsouth',
] as const;

export const GCP_REGIONS = [
  'us-central1', 'us-east1', 'us-east4', 'us-west1', 'us-west2', 'us-west3', 'us-west4',
  'europe-west1', 'europe-west2', 'europe-west3', 'europe-west4', 'europe-west6', 'europe-north1',
  'asia-east1', 'asia-east2', 'asia-northeast1', 'asia-northeast2', 'asia-northeast3',
  'asia-south1', 'asia-south2', 'asia-southeast1', 'asia-southeast2',
  'australia-southeast1', 'australia-southeast2',
  'southamerica-east1',
] as const;

export const CLOUD_PROVIDERS = {
  AWS: { name: 'Amazon Web Services', shortName: 'AWS', color: '#FF9900' },
  AZURE: { name: 'Microsoft Azure', shortName: 'Azure', color: '#0078D4' },
  GCP: { name: 'Google Cloud Platform', shortName: 'GCP', color: '#4285F4' },
  CLOUDFLARE: { name: 'Cloudflare', shortName: 'CF', color: '#F48120' },
} as const;
