import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../services/building.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.less']
})
export class BenchmarkComponent implements OnInit {

  buildings: any[];
  buildingId;

  constructor(private _buildingSvc: BuildingService, private _router: Router) { }

  get isBenchmarking() {
    return true;
  }

  getBuildings() {
    this._buildingSvc.getBuildings().subscribe(resp => {
      console.log(resp);
      this.buildings = resp;
    })
  }

  onSelectChange(value: string) {
    this.buildingId = value;
    console.log(this.buildingId);
  }

  ngOnInit() {
    this.getBuildings();
  }

}
