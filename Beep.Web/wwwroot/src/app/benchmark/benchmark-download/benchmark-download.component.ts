import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BuildingService } from '../../services/building.service';
import { MatDatepicker, MatFormField, MatInput } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormUtility } from '../../utility/utility.form';


@Component({
    selector: 'app-benchmark-download',
    templateUrl: './benchmark-download.component.html',
    styleUrls: ['./benchmark-download.component.less']
})
export class BenchmarkDownloadComponent implements OnInit {

    buildingId: string;
    building: any;
    buildingUsage: any[];
    search: boolean;
    searchForm: FormGroup;
    dateCtrl: FormControl;

    constructor(private _route: ActivatedRoute, private _buildingSvc: BuildingService,
        private formBuilder: FormBuilder, private _formUtility: FormUtility) {
        this._route.params.subscribe(params => {
            this.buildingId = params["id"];
        });
    }

    ngOnInit() {
        this.getBuildingDetail();

        this.searchForm = this.formBuilder.group({
            startDate: new FormControl('', [Validators.required]),
            endDate: new FormControl('', [Validators.required])
        });
        
    }

    getBuildingDetail() {
        this._buildingSvc.getBuildingDetail(this.buildingId).subscribe(resp => {
            this.building = resp
        });
    }

    getAggregateUsages() {
        this._buildingSvc.getAggUsage(this.buildingId, this.searchForm.value)
            .subscribe(resp => {
                console.log(resp);
                this.buildingUsage = resp
        });
    }

    onSearch() {
        this.search = true;
        this.getAggregateUsages();
    }

}
