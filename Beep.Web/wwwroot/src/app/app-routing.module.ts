import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Role } from './models/role.model';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { BenchmarkExportComponent } from './benchmark/benchmark-export/benchmark-export.component';
import { EditBuildingComponent } from './buildings/edit-building/edit-building.component';
import { ManageLocationsComponent } from './buildings/manage-locations/manage-locations.component';
import { EpmRegisterComponent } from './registration/epm-register/epm-register.component';
import { InitialRegisterComponent } from './registration/initial-register/initial-register.component';
import { SecondaryRegisterComponent } from './registration/secondary-register/secondary-register.component';
import { BenchmarkDownloadComponent } from './benchmark/benchmark-download/benchmark-download.component';
import { ForgotUserIDComponent } from './forgot-user-id/forgot-user-id.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordSuccessComponent } from './forgot-password/forgot-password-success/forgot-password-success.component';
import { ForgotUserIdSuccessComponent } from './forgot-user-id/forgot-user-id-success/forgot-user-id-success.component';
import { InitialConfirmationComponent } from './registration/initial-confirmation/initial-confirmation.component';
import { CheckEpmComponent } from './manage-profile/check-epm/check-epm.component';
import { ErrorComponent } from './error/error.component';
import { EditEmailComponent } from './manage-profile/edit-email/edit-email.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'buildings', component: BuildingsComponent, canActivate: [AuthGuard], data: { roles: [Role.NonBenchMarker, Role.BenchMarker] } },
    { path: 'building-detail/:id', component: BuildingDetailComponent, canActivate: [AuthGuard] },
    { path: 'manage-profile', component: ManageProfileComponent, canActivate: [AuthGuard] },
    { path: 'edit-password', component: EditPasswordComponent, canActivate: [AuthGuard] },
    { path: 'edit-name', component: EditNameComponent, canActivate: [AuthGuard] },
    { path: 'edit-security-question', component: EditSecurityQuestionComponent, canActivate: [AuthGuard] },
    { path: 'edit-email', component: EditEmailComponent, canActivate: [AuthGuard] },
    { path: 'add-building', component: AddBuildingComponent, canActivate: [AuthGuard] },
    { path: 'add-locations/:id', component: AddLocationsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactUsComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'benchmark-export/:id', component: BenchmarkExportComponent, canActivate: [AuthGuard], data: { roles: [Role.BenchMarker] }  },
    { path: 'benchmark-download/:id', component: BenchmarkDownloadComponent, canActivate: [AuthGuard] },
    { path: 'edit-building/:id', component: EditBuildingComponent, canActivate: [AuthGuard] },
    { path: 'manage-locations/:id', component: ManageLocationsComponent, canActivate: [AuthGuard] },
    { path: 'registration', component: InitialRegisterComponent },
    { path: 'registration-confirm', component: InitialConfirmationComponent },
    { path: 'registration-continue', component: SecondaryRegisterComponent, canActivate: [AuthGuard]  },
    { path: 'registration-epm', component: EpmRegisterComponent, canActivate: [AuthGuard]  },
    { path: 'forgot-userid', component: ForgotUserIDComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'forgot-password-success', component: ForgotPasswordSuccessComponent },
    { path: 'epm-status', component: CheckEpmComponent, canActivate: [AuthGuard] },
    { path: 'forgot-user-id-success', component: ForgotUserIdSuccessComponent },
    { path: 'error/:id', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
