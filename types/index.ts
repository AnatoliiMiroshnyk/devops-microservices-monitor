export type ServiceStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN';

export interface ServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
  latencyMs: number;
  cpuUsagePct: number;
  memoryUsagePct: number;
  errorRatePct: number;
  uptimePct: number;
  lastChecked: string;
}

export interface MetricSnapshot {
  timestamp: string;
  totalRequestsPerSec: number;
  avgLatencyMs: number;
  globalErrorRate: number;
  services: ServiceHealth[];
}

export interface IncidentAlert {
  id: string;
  serviceId: string;
  serviceName: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  message: string;
  timestamp: string;
}
