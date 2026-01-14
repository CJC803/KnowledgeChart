import { Component, OnInit } from '@angular/core';
import { MockDataService } from './services/mock-data.service';
import { RuntimeDataService } from './services/runtime-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KnowledgeChart';

  constructor(
    private mockDataService: MockDataService,
    private runtimeDataService: RuntimeDataService
  ) {}

  ngOnInit(): void {
    // Load all data sets simultaneously
    this.mockDataService.loadAll().subscribe({
      next: (data) => {
        // Push the loaded data into the runtime state
        this.runtimeDataService.setRoutes(data.routes);
        this.runtimeDataService.setDrivers(data.drivers);
        this.runtimeDataService.setHistoricalData(data.historical);
        
        console.log('All mock data loaded and distributed to runtime.');
      },
      error: (err) => {
        console.error('Failed to load mock data:', err);
      }
    });
  }
}
