import { Component, OnInit } from '@angular/core';
import { RuntimeDataService } from '../../services/runtime-data.service';

@Component({
  selector: 'app-comparison-staffing',
  templateUrl: './comparison-staffing.component.html',
  styleUrls: ['./comparison-staffing.component.css']
})
export class ComparisonStaffingComponent implements OnInit {

  routes: any[] = [];
  drivers: any[] = [];

  constructor(private runtimeData: RuntimeDataService) {}

  ngOnInit(): void {
    this.runtimeData.routes$.subscribe(data => this.routes = data);
    this.runtimeData.drivers$.subscribe(data => this.drivers = data);
  }
}
