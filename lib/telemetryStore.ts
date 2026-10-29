import { ServiceHealth, MetricSnapshot, IncidentAlert } from '@/types';

class TelemetryStore {
  private services: ServiceHealth[] = [
    { id: 'auth-service', name: 'Auth & Identity Service', status: 'HEALTHY', latencyMs: 24, cpuUsagePct: 18, memoryUsagePct: 42, errorRatePct: 0.01, uptimePct: 99.99, lastChecked: 'Just now' },
    { id: 'payment-gateway', name: 'Stripe Payment Gateway', status: 'HEALTHY', latencyMs: 68, cpuUsagePct: 34, memoryUsagePct: 58, errorRatePct: 0.05, uptimePct: 99.95, lastChecked: 'Just now' },
    { id: 'search-indexer', name: 'ElasticSearch Cluster', status: 'DEGRADED', latencyMs: 240, cpuUsagePct: 88, memoryUsagePct: 82, errorRatePct: 2.40, uptimePct: 98.40, lastChecked: 'Just now' },
    { id: 'notification-worker', name: 'RabbitMQ Email Worker', status: 'HEALTHY', latencyMs: 12, cpuUsagePct: 14, memoryUsagePct: 31, errorRatePct: 0.00, uptimePct: 100.00, lastChecked: 'Just now' },
  ];

  private alerts: IncidentAlert[] = [
    { id: 'alt-101', serviceId: 'search-indexer', serviceName: 'ElasticSearch Cluster', severity: 'WARNING', message: 'High CPU utilization threshold exceeded (>85%)', timestamp: '2 mins ago' },
  ];

  public getServices(): ServiceHealth[] {
    return this.services;
  }

  public getAlerts(): IncidentAlert[] {
    return this.alerts;
  }

  public getSnapshot(): MetricSnapshot {
    const totalRequests = 1420;
    const avgLatency = Math.round(this.services.reduce((acc, s) => acc + s.latencyMs, 0) / this.services.length);
    const globalError = Number((this.services.reduce((acc, s) => acc + s.errorRatePct, 0) / this.services.length).toFixed(2));

    return {
      timestamp: new Date().toISOString(),
      totalRequestsPerSec: totalRequests,
      avgLatencyMs: avgLatency,
      globalErrorRate: globalError,
      services: this.services,
    };
  }
}

declare global {
  var telemetryStoreInstance: TelemetryStore | undefined;
}

export const telemetryStore = global.telemetryStoreInstance || new TelemetryStore();
if (process.env.NODE_ENV !== 'production') {
  global.telemetryStoreInstance = telemetryStore;
}
