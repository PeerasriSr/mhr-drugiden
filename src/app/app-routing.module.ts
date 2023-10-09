import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthGuard } from './guard/auth.guard';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

import { CheckRequestComponent } from './pages/phar/check-request/check-request.component';
import { FloorStockComponent } from './pages/phar/floor-stock/floor-stock.component';

import { CheckDrugComponent } from './pages/ward/check-drug/check-drug.component';

import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'Index',
        component: IndexComponent,
      },
      {
        path: 'Ward/CheckDrug',
        component: CheckDrugComponent,
      },

      {
        path: '',
        redirectTo: 'Index',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'Index',
        component: IndexComponent,
      },

      {
        path: 'Phar/CheckRequest',
        component: CheckRequestComponent,
      },
      {
        path: 'FloorStock',
        component: FloorStockComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
