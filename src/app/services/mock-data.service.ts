import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  constructor(private http: HttpClient) {}

  loadAll(): Observable<{ routes: any[]; drivers: any[] }> {
    return forkJoin({
      routes: this.http.get<any[]>('assets/routes.json'),
      drivers: this.http.get<any[]>('assets/drivers.json'),
    });
  }
}
