import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BuildingService } from '../../services/building.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Building } from '../../models/building.model';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-buildings',
    templateUrl: './buildings.component.html',
    styleUrls: ['./buildings.component.less']
})
export class BuildingsComponent implements OnInit {
    buildings: Building[];
    returnUrl: string;
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
    buildingType: string;
    zipCode: number;
    totalCountFlag: boolean;
    filterQuery: string;

    constructor(private _buildingSvc: BuildingService, private _router: Router, private _route: ActivatedRoute) {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'];
    }

    ngOnInit() {
        this.getBuildings();
        this.buildingTypes.map(a => a.trim());
    }

    search() {
        if (this.buildingType || this.zipCode) {
            let buildingTypeQuery = 'function eq';
            let zipQuery = 'zipCode eq';

            let queryString = '';
            if (this.buildingType && this.buildingType.trim() != '')
                queryString = `${buildingTypeQuery} '${this.buildingType.trim()}'`;
            if (this.zipCode && this.zipCode.toString() != '') {
                if (queryString != '')
                    queryString += '&';
                queryString = `${zipQuery} ${this.zipCode.toString()}`;
            }
            this.filterQuery = `?$filter=${queryString}`
        }
        else
            this.filterQuery = undefined;
        this.getBuildings(this.filterQuery);
    }
    getBuildings(query?: string) {
        query = query ? `${query}&` : `?`;
        query = `${query}$top=${this.pageSize}&$skip=${this.pageIndex * this.pageSize}`

        this._buildingSvc.getBuildings(query).subscribe((resp: Building[]) => {
            console.log(resp);
            this.buildings = resp
            if (!this.totalCountFlag) {
                this.length = resp[0].totalBuildings;
                this.totalCountFlag = true;
            }
        })
    }

    selectBuilding(id: number) {
        this._router.navigate(this.returnUrl ? [this.returnUrl, id] : ['building-detail/', id]);
    }


    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageIndex = 0;

    // MatPaginator Output


    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }

    onPage(pageEvent: PageEvent) {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
        this.getBuildings(this.filterQuery);
    }

    onFilterChange() {
        this.pageIndex = 0;
    }
}
