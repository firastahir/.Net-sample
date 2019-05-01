import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { Building } from 'src/app/models/Building.model';

@Component({
    selector: 'app-building-detail',
    templateUrl: './building-detail.component.html',
    styleUrls: ['./building-detail.component.less']
})
export class BuildingDetailComponent implements OnInit {
    buildingId: string;
    building: Building;
    loading: boolean;
    beep_user: any;

    constructor(private _route: ActivatedRoute, private _buildingSvc: BuildingService) {
        this._route.params.subscribe(params => {
            this.buildingId = params["id"];
        });
        this.beep_user = JSON.parse(sessionStorage.getItem('beep_user'));
        console.log(this.beep_user.role);
    }

    ngOnInit() {
        this.getBuildingDetail();
    }
    getBuildingDetail() {
        this.loading = true;
        this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(resp => {
            console.log(resp);
            this.building = resp;
            this.loading = false;
        });
    }
    
}
