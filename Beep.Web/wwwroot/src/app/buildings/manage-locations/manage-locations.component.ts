import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from './../../utility/confirm-dialog/confirm-dialog.component';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';
import { BuildingService } from './../../services/building.service';
import { MatSnackBar } from '@angular/material';
import { Building } from '../../models/Building.model';
import { Premise } from '../../models/premise.model';

@Component({
    selector: 'manage-locations',
    templateUrl: './manage-locations.component.html',
    styleUrls: ['./manage-locations.component.less']
})
export class ManageLocationsComponent implements OnInit {

    building: Building;
    buildingId: string;
    locations: Premise[];
    selectedLocations: Premise[] = [];
    accountNumber: number;


    constructor(private _dialog: MatDialog, private _buildingSvc: BuildingService, private _route: ActivatedRoute, private _snackBar: MatSnackBar) {
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
            message: 'Are you sure you want to delete selected locations?'
        };
        const dialogRef = this._dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteLocations();
            }
        });
    }

    getBuildingDetail() {
        this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(
            (resp) => {
                this.building = resp;
                this.locations = resp.premiseList;
            }
        )
    }
    cancelEdit() {
        location.reload();
    }

    //selectLocation(loc: any) {
    //    this.building.locations = this.building.locations.filter(a => a.premiseNumber != loc.premiseNumber);
    //}

    selectLocation(location: Premise) {
        if (this.selectedLocations.findIndex(a => a.premiseId == location.premiseId) == -1)
            this.selectedLocations.push(location);
        else {
            this.selectedLocations = this.selectedLocations.filter(a => a.premiseId != location.premiseId);
            console.log(this.selectedLocations);
        }
    }

    deleteLocations() {
        if (((this.locations.length - this.selectedLocations.length) == 1) && (this.accountNumber == null || this.accountNumber <= 0)) {
            this.verifyAccount();
        }
        else {
            this._snackBar.open('success!', 'X', { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
            this.selectedLocations.forEach(a => {
                this.locations = this.locations.filter(b => b.premiseId != a.premiseId);
            })
            this.selectedLocations = [];
        }
    }

    verifyAccount() {
        const dialogRef = this._dialog.open(VerifyAccountComponent, {
            data: { accountNumber: this.accountNumber }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.accountNumber = result;
                this.deleteLocations();
            }
        });
    }
}
