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
import { NavbarComponent } from './component/navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CheckRequestComponent } from './pages/phar/check-request/check-request.component';
import { CheckDrugComponent } from './pages/ward/check-drug/check-drug.component';
import { FloorStockComponent } from './pages/phar/floor-stock/floor-stock.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TestComponent } from './pages/test/test.component';
import { NgxMaskModule } from 'ngx-mask'

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MaterialModules,
    NgxSpinnerModule,
    QRCodeModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
