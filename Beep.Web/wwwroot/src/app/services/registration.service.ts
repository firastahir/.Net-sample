import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, retry } from 'rxjs/operators';
import { EnergyStarRegistration } from '../models/energy-star-registration.model';
import { ConfirmEmail } from '../models/confirm-email.model';
import { Role } from '../models/role.model';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

    constructor(private http: HttpClient) { }

    initalRegistration(registrationModel: any): Observable<any> {
        return this.http.post('api/account/initialRegistration', null);
    }

    epmRegistration(registrationModel: any): Observable<any> {
        return this.http.post('api/account/epmRegistration', null);
    }

    confirmEmail(confirmEmailModel: ConfirmEmail): Observable<any> {
        return this.http.post('api/account/confirmEmail', null);
    }

    getEpmData(userID: string): Observable<any> {
        return this.http.get<EnergyStarRegistration>('api/account/GetEpmData/' + userID);
    }
}
