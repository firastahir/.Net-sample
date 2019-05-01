import { Directive, OnInit, OnDestroy, Input, ElementRef, Renderer2, Injectable } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription, of, BehaviorSubject } from 'rxjs';
import { merge, map, tap } from 'rxjs/operators';

@Directive({
    selector: '[invalidmessageFor]'
})

export class InvalidmessageDirective implements OnInit, OnDestroy {
    @Input() invalidmessageFor: string;
    control: AbstractControl;
    hasView = false;
    controlSubscription: Subscription;
    hasSubmitted: boolean;
    constructor(
        private _fg: ControlContainer,
        private _el: ElementRef,
        private render: Renderer2
    ) {
        this.render.setAttribute(this._el.nativeElement, 'hidden', 'true');
    }

    controlSubject = new BehaviorSubject<any>('');
    controlValue$ = this.controlSubject.asObservable();

    ngOnInit() {
        this.control = this.form.get(this.invalidmessageFor);
        (<FormGroupDirective>this._fg).ngSubmit
            .subscribe(a => {
                this.hasSubmitted = true;
                this.setVisible();
                this.controlSubject.next(this.control.value);
            })

        this.control.valueChanges.subscribe(() => {
            this.setVisible();
        });


    }

    private setVisible() {
        if (this.control.invalid && (this.control.dirty || this.hasSubmitted)) {
            this.render.removeAttribute(this._el.nativeElement, 'hidden');
            this._el.nativeElement.previousElementSibling.classList.remove('is-valid');
            this._el.nativeElement.previousElementSibling.classList.add('is-invalid');
        } else {
            this.render.setAttribute(this._el.nativeElement, 'hidden', 'true');
            this._el.nativeElement.previousElementSibling.classList.remove('is-invalid');
            this._el.nativeElement.previousElementSibling.classList.add('is-valid');
        }
    }

    match(error: string) {
        if (this.control && this.control.errors) {
            if (Object.keys(this.control.errors).indexOf(error) > -1) {
                return true;
            }
        }
        return false;
    }

    get form() { return this._fg.formDirective ? (this._fg.formDirective as FormGroupDirective).form : null; }

    ngOnDestroy() {
        // this.control.valueChanges.unsubscribe();
        // this.controlSubscription.unsubscribe();
        // this.controlValue$
    }
}
