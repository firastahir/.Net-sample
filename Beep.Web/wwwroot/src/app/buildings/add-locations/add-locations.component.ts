import { Component, OnInit, Predicate } from '@angular/core';
import { BuildingService } from './../../services/building.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { Premise } from '../../models/premise.model';
import { Building } from '../../models/Building.model';
import { HttpErrorResponse } from '@angular/common/http';
import { VerifyAccountComponent } from '../verify-account/verify-account.component';


@Component({
    selector: 'add-locations',
    templateUrl: './add-locations.component.html',
    styleUrls: ['./add-locations.component.less']
})
export class AddLocationsComponent implements OnInit {

    building: Building;
    buildingId: string;
    locationsByAddress: Premise[];
    locationsByMeter: Premise;
    selectedLocations: Premise[] = [];
    address: string;
    meterID: string;
    accountNumber: number;

    constructor(private _dialog: MatDialog, private _snack: MatSnackBar, private _buildingSvc: BuildingService,
        private _route: ActivatedRoute, private _snackBar: MatSnackBar, private _router: Router) {

        this._route.params.subscribe(params => {
            this.buildingId = params["id"];
        });
    }

    ngOnInit() {
        this.getBuildingDetail();
    }

    getBuildingDetail() {
        this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(
            (resp: Building) => {
                this.building = resp;
            }
        )
    }

    searchByAddress(address: string) {
        this._buildingSvc.searchLocationsByAddress(this.address).subscribe(
            (resp:Premise[]) => {
                this.locationsByAddress = resp;
            }
        )
    }

    searchByMeterID() {
        this._buildingSvc.searchLocationsByMeterID(this.meterID).subscribe(
            (resp: Premise) => {
                this.locationsByMeter = resp;
            },
            (err: HttpErrorResponse) => {
                this._snack.open(err.error, 'X', { duration: 5000, verticalPosition: 'bottom', horizontalPosition: 'center', panelClass: 'snack-error' });
            }
        )
    }
    selectLocation(location: Premise) {
        if (this.selectedLocations.findIndex(a => a.premiseId == location.premiseId) == -1)
            this.selectedLocations.push(location);
        else
            this.selectedLocations = this.selectedLocations.filter(a => a.premiseId != location.premiseId);
    }
    isChecked(l:Premise) {
        return this.selectedLocations.findIndex(a => a.premiseId == l.premiseId) != -1
    }

    removeLocation(loc: Premise) {
        this.selectedLocations = this.selectedLocations.filter(a => a.premiseId != loc.premiseId);
    }

    submitLocations() {
        if (this.selectedLocations.length == 1 && (this.accountNumber == null || this.accountNumber <= 0)) {
            this.verifyAccount();
        }
        else {
            this._snackBar.open('success!', 'X', { duration: 5000, verticalPosition: 'top', panelClass: 'alert-success' });
            this._router.navigateByUrl('/building-detail/' + this.buildingId);
        }
    }

    verifyAccount() {
        const dialogRef = this._dialog.open(VerifyAccountComponent, {
            data: { accountNumber: this.accountNumber }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if (result != null) {
                this.accountNumber = result;
                this.submitLocations();
            }
        });
    }

}
