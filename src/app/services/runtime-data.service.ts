import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RuntimeDataService {
  private routesSubject = new BehaviorSubject<any[]>([]);
  routes$ = this.routesSubject.asObservable();

  private driversSubject = new BehaviorSubject<any[]>([]);
  drivers$ = this.driversSubject.asObservable();

  setRoutes(raw: any) {
  console.log('RAW ROUTES UPLOADED:', raw);

  const routesArray = Array.isArray(raw)
    ? raw
    : raw.routes; // handle wrapped JSON safely

  const normalized = routesArray.map((r: any) => ({
    route: r.route ?? r.Route ?? r.route_id ?? '',
    avgSPM: r.avgSPM ?? r['Avg SPM'] ?? r.avg_spm ?? null,
    avgNDPPH: r.avgNDPPH ?? r['Avg NDPPH'] ?? r.avg_ndpph ?? null,
    avgMiles: r.avgMiles ?? r['Avg Miles'] ?? r.avg_miles ?? null,
    avgStops: r.avgStops ?? r['Avg Stops'] ?? r.avg_stops ?? null,
    ovUn: r.ovUn ?? r['Ov/Un'] ?? r.ov_un ?? null,
    sporh: r.sporh ?? r['SPORH'] ?? r.spo_rh ?? null,
    planDay: r.planDay ?? r['PlanDay'] ?? r.plan_day ?? null,
    paidDay: r.paidDay ?? r['PaidDay'] ?? r.paid_day ?? null
  }));

  console.log('NORMALIZED ROUTES:', normalized);
  console.log('FIRST NORMALIZED ROUTE:', normalized[0]);

  this.routesSubject.next(normalized);
}

  setDrivers(raw: any) {
  console.log('RAW DRIVERS UPLOADED:', raw);
  
  // Handle both array and wrapped JSON formats
  const driversArray = Array.isArray(raw) ? raw : (raw.drivers || []);
  
  const normalized = driversArray.map((d: any) => ({
    name: d.name ?? d.DriverName ?? d.driver_name ?? 'Unknown',
    // Add other fields you need to match your Driver component's expectations
    performance: d.performance ?? d.Score ?? 0,
    stops: d.stops ?? d.TotalStops ?? 0
  }));

  this.driversSubject.next(normalized);
}
}

