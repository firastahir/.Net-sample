import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from './../../utility/confirm-dialog/confirm-dialog.component';
import { BuildingService } from './../../services/building.service';

@Component({
  selector: 'app-manage-locations',
  templateUrl: './manage-locations.component.html',
  styleUrls: ['./manage-locations.component.less']
})
export class ManageLocationsComponent implements OnInit {

  locations: any[];
  buildingId: string;
  constructor(private _dialog: MatDialog, private _buildingSvc: BuildingService, private _route: ActivatedRoute) {
    this._route.params.subscribe(params => {
      this.buildingId = params["id"];
    });
  }

  ngOnInit() {
    this.getBuildingDetail();
  }

  deleteAll() {
    this.openModal();
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you sure you want to delete all locations?'
    };
    
    const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        console.log('proceed');
      else
        console.log('stop');
    });
  }

  getBuildingDetail() {
    this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(
      (resp) => {
        this.locations=resp.locations;
      }
    )
  }
}
