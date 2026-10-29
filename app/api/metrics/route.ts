import { NextResponse } from 'next/server';
import { register, Counter, Gauge } from 'prom-client';

// Prometheus Client Gauges & Counters Initialization
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests across microservices cluster',
  labelNames: ['service', 'status_code'],
});

const serviceLatencyGauge = new Gauge({
  name: 'microservice_latency_ms',
  help: 'Latency in milliseconds per microservice',
  labelNames: ['service'],
});

export async function GET() {
  // Update mock metrics for Prometheus ingestion
  serviceLatencyGauge.set({ service: 'auth-service' }, 24);
  serviceLatencyGauge.set({ service: 'payment-gateway' }, 68);
  serviceLatencyGauge.set({ service: 'search-indexer' }, 240);

  const metricsText = await register.metrics();
  return new NextResponse(metricsText, {
    headers: { 'Content-Type': register.contentType },
  });
}
