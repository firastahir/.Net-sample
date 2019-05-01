import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { ProgressMaskComponent } from '../../utility/progress-mask/progress-mask.component';

@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.less']
})
export class BuildingDetailComponent implements OnInit {
  buildingId: string;
  building: any;
  loading: boolean;

  constructor(private _route: ActivatedRoute, private _buildingSvc: BuildingService) {
    this._route.params.subscribe(params => {
      this.buildingId = params["id"];
    });
  }

  ngOnInit() {
    this.getBuildingDetail();
  }
  getBuildingDetail() {
    this.loading = true;
    this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(resp => {
      this.building = resp;
      this.loading = false;
    });
  }
}
