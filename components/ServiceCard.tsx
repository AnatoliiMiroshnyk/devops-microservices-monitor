'use client';

import React from 'react';
import { ServiceHealth } from '@/types';
import { Server, Activity, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceHealth;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const statusColor = 
    service.status === 'HEALTHY' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
    service.status === 'DEGRADED' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
    'bg-rose-500/10 text-rose-400 border-rose-500/20';

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4 hover:border-slate-700 transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-slate-800 border border-slate-700 rounded-xl text-indigo-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">{service.name}</h3>
            <span className="text-[11px] text-slate-500">{service.id}</span>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border flex items-center space-x-1 ${statusColor}`}>
          {service.status === 'HEALTHY' && <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" />}
          {service.status === 'DEGRADED' && <AlertTriangle className="w-3.5 h-3.5 mr-1 inline" />}
          {service.status === 'DOWN' && <XCircle className="w-3.5 h-3.5 mr-1 inline" />}
          <span>{service.status}</span>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Latency</span>
          <span className="font-bold text-slate-200">{service.latencyMs} ms</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Error Rate</span>
          <span className={`font-bold ${service.errorRatePct > 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {service.errorRatePct}%
          </span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">CPU Usage</span>
          <span className="font-bold text-slate-200">{service.cpuUsagePct}%</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Uptime</span>
          <span className="font-bold text-slate-200">{service.uptimePct}%</span>
        </div>
      </div>
    </div>
  );
}
