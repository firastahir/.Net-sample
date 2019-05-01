import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.less']
})
export class AddBuildingComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  addBuildingForm: FormGroup;
  action: string;
  validationStatus: string;

  ngOnInit() {
    this.addBuildingForm = this.fb.group({
      description: new FormControl('', [Validators.required]),
      buildingType: new FormControl('', [Validators.required]),
      serviceType: new FormControl('', [Validators.required]),
      meterID: new FormControl('', [Validators.required]),
      ESPMbuildingID: new FormControl('', [Validators.required])
    })
  }

  selectAction(a: string) {
    this.action = a;
  }

  onBuildingIDChange() {
    this.validationStatus='validating'
    setTimeout(() => {
      this.validationStatus = 'valid';
    }, 2000);
  }

}
