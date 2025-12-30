import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KnowledgeChartsComponent } from './components/knowledge-charts/knowledge-charts.component';
import { RouteBaselineComponent } from './components/route-baseline/route-baseline.component';
import { DriverBaselineComponent } from './components/driver-baseline/driver-baseline.component';
import { ComparisonStaffingComponent } from './components/comparison-staffing/comparison-staffing.component';

const routes: Routes = [
  { path: '', redirectTo: 'knowledge-charts/routes', pathMatch: 'full' },

  {
    path: 'knowledge-charts',
    component: KnowledgeChartsComponent,
    children: [
      { path: 'routes', component: RouteBaselineComponent },
      { path: 'drivers', component: DriverBaselineComponent },
      { path: 'comparison', component: ComparisonStaffingComponent },
      { path: '', redirectTo: 'routes', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'knowledge-charts/routes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
