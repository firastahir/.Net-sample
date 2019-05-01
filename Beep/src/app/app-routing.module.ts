import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utility/utility.auth-gaurd';
import { BuildingsComponent } from './buildings/list/buildings.component';
import { BuildingDetailComponent } from './buildings/building-detail/building-detail.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { EditNameComponent } from './manage-profile/edit-name/edit-name.component';
import { EditPasswordComponent } from './manage-profile/edit-password/edit-password.component';
import { EditSecurityQuestionComponent } from './manage-profile/edit-security-question/edit-security-question.component';
import { AddBuildingComponent } from './buildings/add-building/add-building.component';
import { AddLocationsComponent } from './buildings/add-locations/add-locations.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { BenchmarkExportComponent } from './benchmark/benchmark-export/benchmark-export.component';
import { BenchmarkUploadComponent } from './benchmark/benchmark-upload/benchmark-upload.component';
import { BenchmarkComponent } from './benchmark/benchmark.component';
import { EditBuildingComponent } from './buildings/edit-building/edit-building.component';
import { ManageLocationsComponent } from './buildings/manage-locations/manage-locations.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'buildings', component: BuildingsComponent, canActivate: [AuthGuard] },
  { path: 'building-detail/:id', component: BuildingDetailComponent, canActivate: [AuthGuard] },
  { path: 'manage-profile', component: ManageProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-password', component: EditPasswordComponent, canActivate: [AuthGuard] },
  { path: 'edit-name', component: EditNameComponent, canActivate: [AuthGuard] },
  { path: 'edit-security-question', component: EditSecurityQuestionComponent, canActivate: [AuthGuard] },
  { path: 'add-building', component: AddBuildingComponent, canActivate: [AuthGuard] },
  { path: 'add-locations', component: AddLocationsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'benchmark-export', component: BenchmarkExportComponent, canActivate: [AuthGuard] },
  { path: 'benchmark-upload', component: BenchmarkUploadComponent, canActivate: [AuthGuard] },
  { path: 'benchmark', component: BenchmarkComponent, canActivate: [AuthGuard] },
  { path: 'edit-building/:id', component: EditBuildingComponent, canActivate: [AuthGuard] },
  { path: 'manage-locations/:id', component: ManageLocationsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
