import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {
    errorCode: number;
    errorDescription: string;
    constructor(private _route: ActivatedRoute) {
        this._route.params.subscribe(params => {
            this.errorCode = +params["id"];
        });
    }

    ngOnInit() {
        switch (this.errorCode) {
            case 403: this.errorDescription = 'UNAUTHORIZED';
                break;
            case 404: this.errorDescription = 'The page you are looking for was not found.';
                break;
            case 500: this.errorDescription = 'INTERNAL SERVER ERROR';
                break;          
        }
    }

}
