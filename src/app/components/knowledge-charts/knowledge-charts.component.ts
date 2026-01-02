import { Component } from '@angular/core';
import { RuntimeDataService } from '../../services/runtime-data.service';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-knowledge-charts',
  templateUrl: './knowledge-charts.component.html',
  styleUrls: ['./knowledge-charts.component.css']
})
export class KnowledgeChartsComponent {

  private routesFile: any[] = [];
  private driversFile: any[] = [];

  constructor(
    private runtimeData: RuntimeDataService,
    private mockData: MockDataService
  ) {}

  // --- Option C: one-click sample load ---
  loadSampleData() {
    this.mockData.loadAll().subscribe(({ routes, drivers }) => {
      console.log('Sample routes loaded:', routes.length);
      console.log('Sample drivers loaded:', drivers.length);

      this.ingestRoutes(routes);
      this.ingestDrivers(drivers);

      // If your UI expects a separate "Load" click, you can skip this
      // and let users hit the normal Load button.
      this.loadData();
    });
  }

  // --- Upload handlers (kept) ---
  onRoutesUpload(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const parsed = JSON.parse(reader.result as string);
      this.ingestRoutes(parsed);
      console.log('Routes file loaded');
    };
    reader.readAsText(file);
  }

  onDriversUpload(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const parsed = JSON.parse(reader.result as string);
      this.ingestDrivers(parsed);
      console.log('Drivers file loaded');
    };
    reader.readAsText(file);
  }

  // --- Shared ingestion (single source of truth) ---
  private ingestRoutes(routes: any[]) {
    this.routesFile = Array.isArray(routes) ? routes : [];
  }

  private ingestDrivers(drivers: any[]) {
    this.driversFile = Array.isArray(drivers) ? drivers : [];
  }

  // --- Existing pipeline (unchanged logic, just safer) ---
  loadData() {
    if (!this.routesFile?.length || !this.driversFile?.length) {
      console.warn('No routes/drivers loaded yet.');
      return;
    }

    const normalizedRoutes = this.routesFile.map(r => ({
      route: r.route ?? r.Route,
      avgSPM: r.avgSPM ?? r.AvgSPM,
      avgNDPPH: r.avgNDPPH ?? r.AvgNDPPH,
      avgMiles: r.avgMiles ?? r.AvgMiles,
      avgStops: r.avgStops ?? r.AvgStops,
      ovUn: r.ovUn ?? r.OvUn,
      sporh: r.sporh ?? r.SPORH,
      planDay: r.planDay ?? r.PlanDay,
      paidDay: r.paidDay ?? r.PaidDay
    }));

    this.runtimeData.setRoutes(normalizedRoutes);
    this.runtimeData.setDrivers(this.driversFile);
  }
}
