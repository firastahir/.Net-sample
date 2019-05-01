import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatPaginatorModule
} from '@angular/material';
import { AuthGuard } from './utility/utility.auth-gaurd';
import { AjaxInterceptor } from './utility/ajax-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildingsComponent } from './buildings/list/buildings.component';
import { BuildingDetailComponent } from './buildings/building-detail/building-detail.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { EditPasswordComponent } from './manage-profile/edit-password/edit-password.component';
import { EditSecurityQuestionComponent } from './manage-profile/edit-security-question/edit-security-question.component';
import { EditNameComponent } from './manage-profile/edit-name/edit-name.component';
import { EditEmailComponent } from './manage-profile/edit-email/edit-email.component';
import { AddBuildingComponent } from './buildings/add-building/add-building.component';
import { AddLocationsComponent } from './buildings/add-locations/add-locations.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { BenchmarkExportComponent } from './benchmark/benchmark-export/benchmark-export.component';
import { BenchmarkComponent } from './benchmark/benchmark.component';
import { EditBuildingComponent } from './buildings/edit-building/edit-building.component';
import { ManageLocationsComponent } from './buildings/manage-locations/manage-locations.component';
import { ConfirmDialogComponent } from './utility/confirm-dialog/confirm-dialog.component';
import { ProgressMaskComponent } from './utility/progress-mask/progress-mask.component';
import { BuildingInfoComponent } from './buildings/building-info/building-info.component';
import { EpmRegisterComponent } from './registration/epm-register/epm-register.component';
import { InitialRegisterComponent } from './registration/initial-register/initial-register.component';
import { SecondaryRegisterComponent } from './registration/secondary-register/secondary-register.component';
import { BenchmarkDownloadComponent } from './benchmark/benchmark-download/benchmark-download.component';
import { ForgotUserIDComponent } from './forgot-user-id/forgot-user-id.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordSuccessComponent } from './forgot-password/forgot-password-success/forgot-password-success.component';
import { ForgotUserIdSuccessComponent } from './forgot-user-id/forgot-user-id-success/forgot-user-id-success.component';
import { FormUtility } from './utility/utility.form';
import { InitialConfirmationComponent } from './registration/initial-confirmation/initial-confirmation.component';
import { CheckEpmComponent } from './manage-profile/check-epm/check-epm.component';
import { ErrorComponent } from './error/error.component';
import { InactivityTrackerDirective } from './directives/inactivity-tracker.directive';
import { GreetingComponent } from './greeting/greeting.component';
import { InvalidmessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';
import { HomeComponent } from './home/home.component';
import { ConfirmEmailComponent } from './registration/confirm-email/confirm-email.component';
import { FooterComponent } from './footer/footer.component';
import { VerifyAccountComponent } from './buildings/verify-account/verify-account.component';


@NgModule({
    declarations: [
        AppComponent,
        BuildingsComponent,
        BuildingDetailComponent,
        ManageProfileComponent,
        EditPasswordComponent,
        EditSecurityQuestionComponent,
        EditNameComponent,
        EditEmailComponent,
        AddBuildingComponent,
        AddLocationsComponent,
        NavComponent,
        LoginComponent,
        DashboardComponent,
        ContactUsComponent,
        FaqComponent,
        BenchmarkExportComponent,
        BenchmarkComponent,
        EditBuildingComponent,
        ManageLocationsComponent,
        ConfirmDialogComponent,
        ProgressMaskComponent,
        EpmRegisterComponent,
        InitialRegisterComponent,
        SecondaryRegisterComponent,
        ProgressMaskComponent,
        BuildingInfoComponent,
        BenchmarkDownloadComponent,
        ForgotUserIDComponent,
        ForgotPasswordComponent,
        ForgotPasswordSuccessComponent,
        ForgotUserIdSuccessComponent,
        InitialConfirmationComponent,
        CheckEpmComponent,
        ErrorComponent,
        InactivityTrackerDirective,
        GreetingComponent,
        InvalidmessageDirective,
        InvalidTypeDirective,
        HomeComponent,
        ConfirmEmailComponent,
        FooterComponent,
        VerifyAccountComponent
    ],
    entryComponents: [
        ConfirmDialogComponent,
        VerifyAccountComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        MatDialogModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        MatPaginatorModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [AuthGuard, FormUtility, {
        provide: HTTP_INTERCEPTORS,
        useClass: AjaxInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
