import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { FormUtility } from '../../utility/utility.form';
import { AjaxInterceptorService } from '../../services/ajax-interceptor.service';



@Component({
    selector: 'app-add-building',
    templateUrl: './add-building.component.html',
    styleUrls: ['./add-building.component.less']
})
export class AddBuildingComponent implements OnInit {

    constructor(private _fb: FormBuilder, private _router: Router,
        private buildingSvc: BuildingService,
        private _formUtil: FormUtility,
        private _ajaxInterceptor: AjaxInterceptorService) { }
    createBuildingForm: FormGroup;
    addBuildingForm: FormGroup;
    action: string;
    validationStatus: string;
    buildingID: number = 9;
    currentYear: number = new Date().getFullYear();
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
        'Office                                              ',
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

    ngOnInit() {
        this.buildingTypes.map(a => a.trim());
        this.initializeCreateForm();
        this.initializeAddForm();
    }

    selectAction(a: string) {
        this.action = a;
        // if (a == 'new')
        // this.initializeCreateForm();
        //else
        //    this.initializeAddForm();
    }

    initializeAddForm() {
        this.addBuildingForm = this._fb.group({
            epmBuildingID: new FormControl(null, [Validators.required])
        })
    }
    initializeCreateForm() {
        this.createBuildingForm = this._fb.group({
            function: new FormControl('', [Validators.required]),
            description: new FormControl(null, [Validators.required]),
            constructionStatus: new FormControl('', [Validators.required]),
            occupancyPercent: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
            floorArea: new FormControl(null, [Validators.required, Validators.min(1)]),
            yearBuilt: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(this.currentYear)]),
            address: new FormGroup({
                addressLine1: new FormControl(null, [Validators.required]),
                addressLine2: new FormControl(null),
                city: new FormControl(null, [Validators.required]),
                state: new FormControl(null, [Validators.required]),
                zipCode: new FormControl(null, [Validators.required])
            })
        })
    }
    onSubmit() {
        if (this.action == 'new') {
            this._formUtil.markFormGroupDirty(this.createBuildingForm);
            if (this.createBuildingForm.valid) {
                this._ajaxInterceptor.setSettings({ redirectUrl:'/add-locations/10' })
                this.buildingSvc.createBuilding(this.createBuildingForm.value).subscribe(() => { });
            }
        }
        else {
            this._formUtil.markFormGroupDirty(this.addBuildingForm);
            if (this.addBuildingForm.valid) {
                this._ajaxInterceptor.setSettings({ redirectUrl: '/add-locations/10' })
                this.buildingSvc.addBuilding(this.addBuildingForm.value.epmBuildingID).subscribe(() => { });
            }
        }
    }

}


