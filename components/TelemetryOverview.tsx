'use client';

import React from 'react';
import { MetricSnapshot } from '@/types';
import { Cpu, Activity, AlertCircle, Gauge } from 'lucide-react';

interface TelemetryOverviewProps {
  snapshot: MetricSnapshot;
}

export default function TelemetryOverview({ snapshot }: TelemetryOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Total Throughput</span>
          <Activity className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-3xl font-extrabold text-slate-100">{snapshot.totalRequestsPerSec} <span className="text-xs text-slate-500 font-normal">req/sec</span></div>
        <p className="text-xs text-emerald-400 font-medium">Cluster load normal</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Avg Cluster Latency</span>
          <Gauge className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-3xl font-extrabold text-slate-100">{snapshot.avgLatencyMs} <span className="text-xs text-slate-500 font-normal">ms</span></div>
        <p className="text-xs text-slate-400">P95 threshold target &lt;100ms</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="text-xs font-semibold uppercase tracking-wider">Global Error Rate</span>
          <AlertCircle className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-3xl font-extrabold text-slate-100">{snapshot.globalErrorRate}%</div>
        <p className={`text-xs font-medium ${snapshot.globalErrorRate > 1 ? 'text-amber-400' : 'text-emerald-400'}`}>
          {snapshot.globalErrorRate > 1 ? 'Elevated search cluster errors' : 'SLA targets met'}
        </p>
      </div>
    </div>
  );
}
