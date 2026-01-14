import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuntimeDataService {
  private routesSubject = new BehaviorSubject<any[]>([]);
  routes$ = this.routesSubject.asObservable();

  private driversSubject = new BehaviorSubject<any[]>([]);
  drivers$ = this.driversSubject.asObservable();

  // NEW: Add a subject for your 30-day historical data
  private historicalSubject = new BehaviorSubject<any[]>([]);
  historicalStats$ = this.historicalSubject.asObservable();

  setRoutes(raw: any) {
    const routesArray = Array.isArray(raw) ? raw : raw.routes;
    const normalized = routesArray.map((r: any) => ({
      route: r.route ?? r.Route ?? r.route_id ?? '',
      avgSPM: r.avgSPM ?? r['Avg SPM'] ?? null,
      avgNDPPH: r.avgNDPPH ?? r['Avg NDPPH'] ?? null,
      avgMiles: r.avgMiles ?? r['Avg Miles'] ?? null,
      avgStops: r.avgStops ?? r['Avg Stops'] ?? null,
      ovUn: r.ovUn ?? r['Ov/Un'] ?? null,
      sporh: r.sporh ?? r['SPORH'] ?? null,
      planDay: r.planDay ?? r['PlanDay'] ?? null,
      paidDay: r.paidDay ?? r['PaidDay'] ?? null
    }));
    this.routesSubject.next(normalized);
  }

  setDrivers(raw: any) {
    const driversArray = Array.isArray(raw) ? raw : (raw.drivers || []);
    // We keep your current simple driver list, but now components 
    // can cross-reference driverId with the historical stats below.
    const normalized = driversArray.map((d: any) => ({
      driverId: d.driverId ?? d.id,
      name: d.name ?? `${d.firstName} ${d.lastName}` ?? 'Unknown',
      performance: d.performance ?? 0,
      stops: d.stops ?? 0
    }));
    this.driversSubject.next(normalized);
  }

  // NEW: Handle the 30-day daily stats file
  setHistoricalData(raw: any) {
    console.log('HISTORICAL DATA UPLOADED:', raw);
    // This expects the format from our Python script: [{ driverId, days: [] }]
    this.historicalSubject.next(raw);
  }
}
