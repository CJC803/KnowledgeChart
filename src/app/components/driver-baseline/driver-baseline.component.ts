import { Component, OnInit } from '@angular/core';
import { RuntimeDataService } from '../../services/runtime-data.service';

@Component({
  selector: 'app-driver-baseline',
  templateUrl: './driver-baseline.component.html',
  styleUrls: ['./driver-baseline.component.css']
})
export class DriverBaselineComponent implements OnInit {
  drivers: any[] = [];

  constructor(private runtimeData: RuntimeDataService) {}

  ngOnInit(): void {
    this.runtimeData.drivers$.subscribe(drivers => {
      console.log('DRIVERS BOUND TO TABLE:', drivers);
      this.drivers = drivers;
    });
  }
}



