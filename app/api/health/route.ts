import { NextResponse } from 'next/server';
import { telemetryStore } from '@/lib/telemetryStore';

export async function GET() {
  const snapshot = telemetryStore.getSnapshot();
  const alerts = telemetryStore.getAlerts();

  return NextResponse.json({
    snapshot,
    alerts,
    systemStatus: snapshot.globalErrorRate > 1.5 ? 'DEGRADED' : 'OPERATIONAL',
  });
}
