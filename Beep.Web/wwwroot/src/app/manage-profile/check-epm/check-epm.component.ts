import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role.model';

@Component({
    selector: 'app-check-epm',
    templateUrl: './check-epm.component.html',
    styleUrls: ['./check-epm.component.less']
})
export class CheckEpmComponent implements OnInit {

    energyStarID: string;
    isBenchmarker: boolean;

    constructor() {
    }

    ngOnInit() {
        if (JSON.parse(sessionStorage.getItem('beep_user')).role == Role.BenchMarker) {
            this.isBenchmarker = true;
        }
        else {
            this.isBenchmarker = false;
        }

    }
}
