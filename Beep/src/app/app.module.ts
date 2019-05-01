import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';

import { AuthGuard } from './utility/utility.auth-gaurd';

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
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { BenchmarkExportComponent } from './benchmark/benchmark-export/benchmark-export.component';
import { BenchmarkUploadComponent } from './benchmark/benchmark-upload/benchmark-upload.component';
import { BenchmarkComponent } from './benchmark/benchmark.component';
import { EditBuildingComponent } from './buildings/edit-building/edit-building.component';
import { ManageLocationsComponent } from './buildings/manage-locations/manage-locations.component';
import { ConfirmDialogComponent } from './utility/confirm-dialog/confirm-dialog.component';
import { ProgressMaskComponent } from './utility/progress-mask/progress-mask.component';

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
    HomeComponent,
    ContactUsComponent,
    FaqComponent,
    BenchmarkExportComponent,
    BenchmarkUploadComponent,
    BenchmarkComponent,
    EditBuildingComponent,
    ManageLocationsComponent,
    ConfirmDialogComponent,
    ProgressMaskComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
