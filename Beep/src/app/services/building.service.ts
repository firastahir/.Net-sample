import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  getBuildings(): Observable<any[]> {
    return this.http.get<any[]>('api/building/getBuildings', { headers: new HttpHeaders({ 'ContentType': 'application/json; charset=utf-8' }) });
  }

  getBuildingDetail(id: string): Observable<any> {
    return this.http.get<any>('api/building/getBuildingDetail/' + id);
  }
}
