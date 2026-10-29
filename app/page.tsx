'use client';

import React, { useEffect, useState } from 'react';
import TelemetryOverview from '@/components/TelemetryOverview';
import ServiceCard from '@/components/ServiceCard';
import { Activity, ShieldCheck, AlertOctagon, Terminal, RefreshCw, Cpu } from 'lucide-react';

export default function ObservabilityDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = () => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => console.error('Health poll failed:', err));
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm space-x-2">
        <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
        <span>Polling Kubernetes Telemetry Cluster...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              KubePulse Observability Engine
            </h1>
            <p className="text-xs text-slate-400">Kubernetes Microservices & Prometheus Metrics Exporter</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="/api/metrics"
            target="_blank"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-1.5 transition"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Prometheus Metrics Endpoint</span>
          </a>
          <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <span className={`w-2 h-2 rounded-full ${data.systemStatus === 'OPERATIONAL' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-slate-300 font-semibold">{data.systemStatus}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Top KPI Telemetry Row */}
        <TelemetryOverview snapshot={data.snapshot} />

        {/* Incident Alerts Panel */}
        {data.alerts && data.alerts.length > 0 && (
          <div className="bg-amber-950/20 border border-amber-500/30 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase block">Active Cluster Alert</span>
                <p className="text-xs text-slate-300">{data.alerts[0].serviceName}: {data.alerts[0].message}</p>
              </div>
            </div>
            <span className="text-[11px] text-slate-500">{data.alerts[0].timestamp}</span>
          </div>
        )}

        {/* Microservices Health Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-slate-200 text-sm uppercase tracking-wide">Monitored Microservices ({data.snapshot.services.length})</h2>
            <span className="text-xs text-slate-500">Auto-refreshing every 5s</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.snapshot.services.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
