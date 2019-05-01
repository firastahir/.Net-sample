import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../services/building.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.less']
})
export class BuildingsComponent implements OnInit {
  buildings: any[];
  constructor(private _buildingSvc: BuildingService) { }

  ngOnInit() {
    this.getBuildings();
  }

  getBuildings() {
    this._buildingSvc.getBuildings().subscribe(resp => {
      console.log(resp);
      this.buildings = resp;
    })
  }

}
