import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../services/building.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.less']
})
export class BuildingsComponent implements OnInit {
  buildings: any[];
  constructor(private _buildingSvc: BuildingService, private _router:Router) { }

  ngOnInit() {
    this.getBuildings();
  }

  getBuildings() {
    this._buildingSvc.getBuildings().subscribe(resp => {
      console.log(resp);
      this.buildings = resp;
    })
  }

  selectBuilding(id: number) {
    this._router.navigateByUrl('/building-detail/' + id);
  }

}
