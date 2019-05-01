import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AjaxInterceptorService } from '../../services/ajax-interceptor.service';

@Component({
    selector: 'app-edit-building',
    templateUrl: './edit-building.component.html',
    styleUrls: ['./edit-building.component.less']
})
export class EditBuildingComponent implements OnInit {
    buildingId: string;
    building: any = new Object();
    successSnackRef: MatSnackBarRef<SimpleSnackBar>;

    constructionStatuses: any[] = ['Existing', 'project', 'Test'];
    buildingTypes: any[] = [
        'Adult Education                             ',
        'Ambulatory Surgical Center                          ',
        'Aquarium                                            ',
        'Automobile Dealership                               ',
        'Bank Branch                                         ',
        'Bar / Nightclub                                     ',
        'Barracks                                            ',
        'Bowling Alley                                       ',
        'Casino                                              ',
        'College / University                                ',
        'Convenience Store with Gas Station                  ',
        'Convenience Store without Gas Station               ',
        'Convention Center                                   ',
        'Courthouse                                          ',
        'Data Center                                         ',
        'Distribution Center                                 ',
        'Drinking Water Treatment & amp; Distribution        ',
        'Enclosed Mall                                       ',
        'Energy / Power Station                              ',
        'Fast Food Restaurant                                ',
        'Financial Office                                    ',
        'Fire Station                                        ',
        'Fitness Center / Health Club / Gym                  ',
        'Food Sales                                          ',
        'Food Service                                        ',
        'Hospital(General Medical & amp; Surgical)           ',
        'Hotel                                               ',
        'Ice / Curling Rink                                  ',
        'Indoor Arena                                        ',
        'K - 12 School                                       ',
        'Laboratory                                          ',
        'Library                                             ',
        'Lifestyle Center                                    ',
        'Mailing Center / Post Office                        ',
        'Manufacturing / Industrial Plant                    ',
        'Medical Office                                      ',
        'Mixed Use Property                                  ',
        'Movie Theater                                       ',
        'Multifamily Housing                                 ',
        'Museum                                              ',
        'Non - Refrigerated Warehouse                        ',
        'Office',
        'Other - Education                                   ',
        'Other - Entertainment / Public Assembly             ',
        'Other - Lodging / Residential                       ',
        'Other - Mall                                        ',
        'Other - Public Services                             ',
        'Other - Recreation                                  ',
        'Other - Restaurant / Bar                            ',
        'Other - Services                                    ',
        'Other - Stadium                                     ',
        'Other - Technology / Science                        ',
        'Other - Utility                                     ',
        'Other                                               ',
        'Other / Specialty Hospital                          ',
        'Outpatient Rehabilitation / Physical Therapy        ',
        'Parking                                             ',
        'Performing Arts                                     ',
        'Personal Services(Health / Beauty, Dry Cleaning, etc',
        'Police Station                                      ',
        'Pre - school / Daycare                              ',
        'Prison / Incarceration                              ',
        'Race Track                                          ',
        'Refrigerated Warehouse                              ',
        'Repair Services(Vehicle, Shoe, Locksmith, etc)      ',
        'Residence Hall / Dormitory                          ',
        'Residential Care Facility                           ',
        'Restaurant                                          ',
        'Retail Store                                        ',
        'Roller Rink                                         ',
        'Self - Storage Facility                             ',
        'Senior Care Community                               ',
        'Single Family Home                                  ',
        'Social / Meeting Hall                               ',
        'Stadium(Closed)                                     ',
        'Stadium(Open)                                       ',
        'Strip Mall                                          ',
        'Supermarket / Grocery Store                         ',
        'Swimming Pool                                       ',
        'Transportation Terminal / Station                   ',
        'Urgent Care / Clinic / Other Outpatient             ',
        'Veterinary Office                                   ',
        'Vocational School                                   ',
        'Wastewater Treatment Plant                          ',
        'Wholesale Club / Supercenter                        ',
        'Worship Facility                                    ',
        'Zoo                                                 '
    ];

    editForm: FormGroup;

    constructor(private _router: Router, private _route: ActivatedRoute, private _buildingSvc: BuildingService, private _fb: FormBuilder, private _ajaxInterceptorSvc: AjaxInterceptorService) {
        this._route.params.subscribe(params => {
            this.buildingId = params["id"];
        });
    }

    ngOnInit() {
        this.building.address = new Object();
        this.getBuildingDetail();
    }
    getBuildingDetail() {
        this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(resp => {
            this.building = resp;
            this.editForm = this._fb.group({
                buildingID: new FormControl(this.building.buildingId),
                function: new FormControl(this.building.function, [Validators.required]),
                description: new FormControl(this.building.name, [Validators.required]),
                constructionStatus: new FormControl(this.building.constructionStatus, [Validators.required]),
                occupancyPercent: new FormControl(this.building.occupancyPercent, [Validators.required, Validators.min(1), Validators.max(100)]),
                floorArea: new FormControl(this.building.floorArea, [Validators.required]),
                yearBuilt: new FormControl(this.building.yearBuilt, [Validators.required]),
                address: new FormGroup({
                    addressLine1: new FormControl(this.building.addressLine1, [Validators.required]),
                    addressLine2: new FormControl(this.building.addressLine2),
                    city: new FormControl(this.building.city, [Validators.required]),
                    state: new FormControl(this.building.state, [Validators.required]),
                    zipCode: new FormControl(this.building.zipCode, [Validators.required])
                })
            })
        });
    }
    onSubmit() {
        let b = this.editForm.value;
        b.locations = this.building.locations;
        if (this._router.url.toLowerCase().indexOf('edit-building') > -1)
        this._ajaxInterceptorSvc.setSettings({ redirectUrl: '/building-detail/' + this.buildingId });

        this._buildingSvc.createBuilding(b).subscribe(
            () => {  }
        );
    }
}
