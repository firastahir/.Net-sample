import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.less']
})
export class EditBuildingComponent implements OnInit {
  buildingId: string;
  building: any;

  constructor(private _route: ActivatedRoute, private _buildingSvc: BuildingService, private _snackBar: MatSnackBar) {
    this._route.params.subscribe(params => {
      this.buildingId = params["id"];
    });
  }

  ngOnInit() {
    this.getBuildingDetail();
  }
  getBuildingDetail() {
    this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(resp => {
      this.building = resp
    });
  }
  onSubmit() {
    this._snackBar.open('success!', 'X', { duration: 500000, verticalPosition: 'top', panelClass:'alert-success' });
  }
}
