import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

    constructor(private _http: HttpClient) { }

    getBannerImages(): Observable<string[]> {
        return this._http.get <string[]>('api/home/getBannerImages');
    }

    getPremise(): Observable<any> {
        return this._http.get<any>('api/home/GetPremisesAsync');
    }

    sendContactUs(contactUsModel: any): Observable<any> {
        return this._http.post('', contactUsModel);
    }

    getFaqs(): Observable<any> {
        return this._http.get<any>('');
    }
}
