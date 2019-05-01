import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Premise } from '../models/premise.model';
import { Building } from '../models/Building.model';

@Injectable({
    providedIn: 'root'
})
export class BuildingService {

    constructor(private http: HttpClient) { }

    getBuildings(query?: string): Observable<Building[]> {
        return this.http.get<Building[]>(`api/building/getBuildings${query ? query:''}`, { headers: new HttpHeaders({ 'ContentType': 'application/json; charset=utf-8' }) });
    }

    getBuildingDetail(id: string): Observable<Building> {
        return this.http.get<Building>('api/building/getBuildingDetail/' + id);
    }

    searchLocationsByAddress(address: string): Observable<Premise[]> {
        return this.http.get<Premise[]>('api/building/searchLocationsByAddress?address=' + address);
    }

    searchLocationsByMeterID(meter: string): Observable<Premise> {
        return this.http.get<Premise>('api/building/searchLocationsByMeterID?meter=' + meter);
    }

    createBuilding(building: any): Observable<any> {
        return this.http.put('api/building/createBuilding', building);
    }

    addBuilding(buildingID: number) {
        return this.http.post('api/building/addBuilding', buildingID);
    }

    updateBuilding(building: any): Observable<any> {
        return this.http.post('api/building/updateBuilding', building);
    }

    getAggUsage(buildingID: string, dateRangeModel: any): Observable<any[]> {
        return this.http.get<any[]>('api/building/getUsageData/' + buildingID);
    }
}
