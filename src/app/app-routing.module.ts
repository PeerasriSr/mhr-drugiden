import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './component/navbar/navbar.component';
import { PharGuard } from './guard/auth.guard';
import { WardGuard } from './guard/auth.guard';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

//phar
import { CheckRequestComponent } from './pages/phar/check-request/check-request.component';
import { FloorStockComponent } from './pages/phar/floor-stock/floor-stock.component';
import { ReportFloorskComponent } from './pages/phar/report-floorsk/report-floorsk.component';
import { ReportDispensComponent } from './pages/phar/report-dispens/report-dispens.component';
import { HomemedDisplayComponent } from './pages/phar/homemed-display/homemed-display.component';
import { PatientAdmitComponent } from './pages/phar/patient-admit/patient-admit.component';
import { DrugReceiveComponent } from './pages/phar/drug-receive/drug-receive.component';
import { ReportAddictiveComponent } from './pages/phar/report-addictive/report-addictive.component';

//ward
import { OrderInwardComponent } from './pages/ward/order-inward/order-inward.component';
import { MeddispenComponent } from './pages/ward/meddispen/meddispen.component';
import { ReportDispenComponent } from './pages/ward/report-dispen/report-dispen.component';
import { RefundComponent } from './pages/ward/refund/refund.component';
import { DrugReturnComponent } from './pages/ward/drug-return/drug-return.component';

import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Homemed/Display',
    component: HomemedDisplayComponent,
  },

  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'Index',
        component: IndexComponent,
      },
      {
        path: '',
        redirectTo: 'Index',
        pathMatch: 'full',
      },
      {
        path: 'OrderInWard',
        component: OrderInwardComponent,
      },
      {
        path: 'Meddispen/Order',
        component: MeddispenComponent,
      },
      {
        path: 'Meddispen/Wards',
        component: ReportDispenComponent,
      },
      {
        path: 'Refund',
        component: RefundComponent,
      },
    ],
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [WardGuard],
    children: [
      {
        path: 'Drug/Return',
        component: DrugReturnComponent,
      },
    ],
  },

  {
    path: '',
    component: NavbarComponent,
    canActivate: [PharGuard],
    children: [
      {
        path: 'Index',
        component: IndexComponent,
      },
      {
        path: '',
        redirectTo: 'Index',
        pathMatch: 'full',
      },
      {
        path: 'CheckRequest',
        component: CheckRequestComponent,
      },

      {
        path: 'MedDispen/Inventory',
        component: FloorStockComponent,
      },
      {
        path: 'MedDispen/User',
        component: ReportFloorskComponent,
      },
      {
        path: 'MedDispen/Drug',
        component: ReportDispensComponent,
      },
      {
        path: 'Patient/Admit',
        component: PatientAdmitComponent,
      },
      {
        path: 'Drug/Receive',
        component: DrugReceiveComponent,
      },
      {
        path: 'Report/Addictive',
        component: ReportAddictiveComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
