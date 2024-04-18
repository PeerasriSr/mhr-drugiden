import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MaterialModules } from './materialModule';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NavbarComponent } from './component/navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CheckRequestComponent } from './pages/phar/check-request/check-request.component';
import { CheckDrugComponent } from './pages/ward/check-drug/check-drug.component';
import { FloorStockComponent } from './pages/phar/floor-stock/floor-stock.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TestComponent } from './pages/test/test.component';
import { NgxMaskModule } from 'ngx-mask';
import { ReportFloorskComponent } from './pages/phar/report-floorsk/report-floorsk.component';
import { OrderAllwardComponent } from './pages/phar/order-allward/order-allward.component';
import { OrderInwardComponent } from './pages/ward/order-inward/order-inward.component';
import { MeddispenComponent } from './pages/ward/meddispen/meddispen.component';
import { ReportDispenComponent } from './pages/ward/report-dispen/report-dispen.component';
import { ReportDispensComponent } from './pages/phar/report-dispens/report-dispens.component';
import { HomemedDisplayComponent } from './pages/phar/homemed-display/homemed-display.component';
import { PatientAdmitComponent } from './pages/phar/patient-admit/patient-admit.component'
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { WaitingComponent } from './waiting/waiting.component';
import { UrgentComponent } from './urgent/urgent.component';
import { RefundComponent } from './pages/ward/refund/refund.component';
import { DrugReturnComponent } from './pages/ward/drug-return/drug-return.component';
import { DrugReceiveComponent } from './pages/phar/drug-receive/drug-receive.component';
import { ReportAddictiveComponent } from './pages/phar/report-addictive/report-addictive.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,
    CheckRequestComponent,
    CheckDrugComponent,
    FloorStockComponent,
    TestComponent,
    ReportFloorskComponent,
    OrderAllwardComponent,
    OrderInwardComponent,
    MeddispenComponent,
    ReportDispenComponent,
    ReportDispensComponent,
    HomemedDisplayComponent,
    PatientAdmitComponent,
    WaitingComponent,
    UrgentComponent,
    RefundComponent,
    DrugReturnComponent,
    DrugReceiveComponent,
    ReportAddictiveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MaterialModules,
    NgxSpinnerModule,
    MatTableExporterModule,
    QRCodeModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
