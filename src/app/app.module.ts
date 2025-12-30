import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { KnowledgeChartsComponent } from './components/knowledge-charts/knowledge-charts.component';
import { RouteBaselineComponent } from './components/route-baseline/route-baseline.component';
import { DriverBaselineComponent } from './components/driver-baseline/driver-baseline.component';
import { ComparisonStaffingComponent } from './components/comparison-staffing/comparison-staffing.component';

@NgModule({
  declarations: [
    AppComponent,
    KnowledgeChartsComponent,
    RouteBaselineComponent,
    DriverBaselineComponent,
    ComparisonStaffingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule   // 👈 THIS WAS MISSING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

