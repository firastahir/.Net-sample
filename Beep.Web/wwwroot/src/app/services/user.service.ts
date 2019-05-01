import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, retry } from 'rxjs/operators';
import { User } from '../models/user.model';

const httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/x-www-form-urlencoded; charset=UTF-8' })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    isLoggedInSubject = new BehaviorSubject<boolean>(this.isSessionAlive());
    userSubject = new BehaviorSubject<User>(null);

    login(loginModel: any): Observable<any> {
        return this.http.post('api/account/login', loginModel);
    }

    getUser(): Observable<User> {
        if (this.isSessionAlive())
            return this.userSubject.asObservable();
        else {
            return this.http.get<User>('api/account/getUser')
                .pipe(
                    tap(
                        (resp) => {
                            sessionStorage.setItem('beep_user', JSON.stringify(resp));
                            this.isLoggedInSubject.next(true);
                            this.userSubject.next(resp as User);
                        }
                    )
                )
        }
    }

    logout(): Observable<any> {
        sessionStorage.removeItem('beep_user');
        this.isLoggedInSubject.next(false);
        this.userSubject.next(null);
        return this.http.post('api/account/logout', null);
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedInSubject.asObservable();
    }

    isSessionAlive(): boolean {
        return !!sessionStorage.getItem('beep_user');
    }

    changePassword(passwordModel: any): Observable<any> {
        return this.http.post('api/account/changePassword', passwordModel);
    }

    changeSecurityQuestion(securityQuestionModel: any): Observable<any> {
        return this.http.post('api/account/changeSecurityQuestion', securityQuestionModel);
    }

    changeName(nameModel: any): Observable<any> {
        return this.http.post('api/account/changeName', nameModel);
    }

    changeEmail(emailModel: any): Observable<any> {
        return this.http.post('api/account/changeEmail', emailModel);
    }
}
