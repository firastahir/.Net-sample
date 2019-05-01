import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-benchmark-export',
    templateUrl: './benchmark-export.component.html',
    styleUrls: ['./benchmark-export.component.less']
})
export class BenchmarkExportComponent implements OnInit {

    buildingId: string;
    building: any;
    isNewUser: boolean;

    constructor(private _route: ActivatedRoute, private _buildingSvc: BuildingService, private _snackBar: MatSnackBar) {
        this._route.params.subscribe(params => {
            this.buildingId = params["id"];
        });
    }

    ngOnInit() {
        this.getBuildingDetail();
        this.isNewUser = false;
    }

    getBuildingDetail() {
        this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(resp => {
            this.building = resp
        });
    }

    onSubmit() {
        this._snackBar.open('success!', 'X', { duration: 3000, verticalPosition: 'bottom' });
    }


}
