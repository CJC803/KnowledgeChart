import { Component } from '@angular/core';
import { RuntimeDataService } from '../../services/runtime-data.service';

@Component({
  selector: 'app-knowledge-charts',
  templateUrl: './knowledge-charts.component.html',
  styleUrls: ['./knowledge-charts.component.css']
})
export class KnowledgeChartsComponent {

  private routesFile: any[] = [];
  private driversFile: any[] = [];

  constructor(private runtimeData: RuntimeDataService) {}

  onRoutesUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.routesFile = JSON.parse(reader.result as string);
      console.log('Routes file loaded');
    };

    reader.readAsText(file);
  }

  onDriversUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.driversFile = JSON.parse(reader.result as string);
      console.log('Drivers file loaded');
    };

    reader.readAsText(file);
  }

  loadData() {
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
