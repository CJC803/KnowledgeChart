import { Component, OnInit } from '@angular/core';
import { RuntimeDataService } from '../../services/runtime-data.service';

@Component({
  selector: 'app-route-baseline',
  templateUrl: './route-baseline.component.html',
  styleUrls: ['./route-baseline.component.css']
})
export class RouteBaselineComponent implements OnInit {
  routes: any[] = [];

  constructor(private runtimeData: RuntimeDataService) {}

  ngOnInit(): void {
  this.runtimeData.routes$.subscribe(routes => {
    console.log('FIRST ROUTE OBJECT:', routes[0]);
    this.routes = routes;
  });
}
}

