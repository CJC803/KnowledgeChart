import { Component, OnInit } from '@angular/core';
import { RuntimeDataService } from '../../services/runtime-data.service';

@Component({
  selector: 'app-driver-baseline',
  templateUrl: './driver-baseline.component.html',
  styleUrls: ['./driver-baseline.component.css']
})
export class DriverBaselineComponent implements OnInit {
  drivers: any[] = [];
  
  // 👈 Add these missing variables
  driverTrendData: any[] = [];
  efficiencyData: any[] = [];

  constructor(private runtimeData: RuntimeDataService) {}

  ngOnInit(): void {
    this.runtimeData.drivers$.subscribe(data => {
      this.drivers = data;

      // 👈 Map the data for the Scatter Plot (Efficiency)
      this.efficiencyData = data.map(d => ({
        name: d.name,
        series: [{
          name: d.name,
          x: d.avgMiles || 0,
          y: d.avgStops || 0,
          r: (d.avgSPM || 10) / 5
        }]
      }));

      // 👈 Map the data for the Trendline
      this.driverTrendData = data.map(d => ({
        name: d.name,
        series: [
          { name: 'Prior', value: (d.avgSPM || 0) * 0.95 },
          { name: 'Current', value: d.avgSPM || 0 }
        ]
      }));
    });
  }
}



