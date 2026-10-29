# KubePulse: Microservices Health & DevOps Observability Engine

KubePulse is a enterprise-grade DevOps telemetry and microservices observability platform built with Next.js 14 App Router, TypeScript, Prometheus Client (`prom-client`), and Tailwind CSS.

## Key Features
- **Real-Time Cluster Health Telemetry:** Live auto-refreshing service health checks monitoring latency, CPU usage, memory utilization, and error rates.
- **Prometheus Exporter Endpoint:** Exposes `/api/metrics` formatted according to OpenMetrics standards for Prometheus/Grafana scraping.
- **Incident Response Alerting:** Highlights degraded cluster nodes and active threshold violations.
- **Developer Experience:** Fully typed interfaces for microservice health states and telemetry snapshots.

## Setup Instructions

1. Install project dependencies:
   ```bash
   npm install
   ```
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to inspect the telemetry dashboard.
4. Access the raw Prometheus scrape endpoint directly at [http://localhost:3000/api/metrics](http://localhost:3000/api/metrics)!
