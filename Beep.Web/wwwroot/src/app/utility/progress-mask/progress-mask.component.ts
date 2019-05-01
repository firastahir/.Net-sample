import { Component, OnInit } from '@angular/core';
import { AjaxInterceptorService } from '../../services/ajax-interceptor.service'

@Component({
  selector: 'progress-mask',
  templateUrl: './progress-mask.component.html',
  styleUrls: ['./progress-mask.component.less']
})
export class ProgressMaskComponent implements OnInit {
    showProgress: boolean;

    constructor(private _ajaxInterceptorSvc: AjaxInterceptorService) { }

    ngOnInit() {
        //subscribe to showProgressMask
        this._ajaxInterceptorSvc.showProgressMask.subscribe(
            status => this.showProgress = status
        )
  }

}
