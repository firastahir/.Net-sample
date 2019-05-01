import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AjaxInterceptorService {

    constructor() { }

    //progress-mask
    private showProgressSub = new BehaviorSubject<boolean>(false);
    showProgressMask = this.showProgressSub.asObservable();
    setProgressSMasktatus(status: boolean) {
        this.showProgressSub.next(status);
    }

    private setingsSub = new BehaviorSubject<InterceptorSettings>(null);
    settings(): Observable<InterceptorSettings> {
        return this.setingsSub.asObservable();
    }
    setSettings(s?: InterceptorSettings) {
        this.setingsSub.next(s);
    }
}

export interface InterceptorSettings {
    redirectUrl?: string;
    ignoreSuccessSnack?: boolean;
}

