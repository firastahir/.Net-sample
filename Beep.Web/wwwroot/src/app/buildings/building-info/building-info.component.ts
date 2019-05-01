import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../../services/building.service';


@Component({
  selector: 'building-info',
  templateUrl: './building-info.component.html',
  styleUrls: ['./building-info.component.less']
})
export class BuildingInfoComponent implements OnInit {

    buildingId: string;
    building: any;

    @Input() showEditLink: boolean;

    constructor(private _route: ActivatedRoute, private _buildingSvc: BuildingService) {
        this._route.params.subscribe(params => {
            this.buildingId = params["id"];
        });
    }

    ngOnInit() {
        this.getBuildingDetail();
  }

    getBuildingDetail() {
        this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(resp => {
            this.building = resp;
        });
    }
}
