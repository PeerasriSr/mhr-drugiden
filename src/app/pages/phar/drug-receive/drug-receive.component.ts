import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const _window: any = window;

@Component({
  selector: 'app-drug-receive',
  templateUrl: './drug-receive.component.html',
  styleUrls: ['./drug-receive.component.scss'],
})
export class DrugReceiveComponent implements OnInit {
  wardCode: any;
  wardName: any;
  userName: any;
  formatDate: any;

  campaign = new FormGroup({
    picker: new FormControl(new Date(new Date().setDate(new Date().getDate()))),
  });

  listOrderWard: Array<any> = [];
  dataOrderWard: any;
  @ViewChild('sortOrderWard') sortOrderWard!: MatSort;
  @ViewChild('paginOrderWard') paginOrderWard!: MatPaginator;
  displayOrderWard: string[] = [
    'orderDate',
    'orderTime',
    'wardName',
    'hn',
    'fullname',
    'drugName',
    'qtyReq',
    'qtyReturn',
    'ampReturn',
    'priceReturn',
    'qtyUse',
    'iden',
    'destroyer',
    'witness',
    'orderStatus',
  ];

  formDrug = new FormGroup({
    orderDate: new FormControl('', [Validators.required]),
    orderTime: new FormControl('', [Validators.required]),
    wardName: new FormControl('', [Validators.required]),
    hn: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    drugName: new FormControl('', [Validators.required]),
    drugCode: new FormControl('', [Validators.required]),
    qtyReq: new FormControl('', [Validators.required]),
    qtyReturn: new FormControl('', [Validators.required]),
    ampReturn: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    priceReturn: new FormControl('', [Validators.required]),
    qtyUse: new FormControl('', [Validators.required]),
  });

  constructor(
    public services: AppService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.wardCode = sessionStorage.getItem('location');
    this.wardName = sessionStorage.getItem('locationNm');
    this.userName = sessionStorage.getItem('userName');
    this.formatDate = moment(new Date()).format('YYYY-MM-DD');
    await this.start();
  }

  async dateChange(event: any) {
    this.formatDate = moment(new Date(event.value)).format('YYYY-MM-DD');
    await this.start();
  }

  async start() {
    await this.orderWardAddictive();
  }

  async orderWardAddictive() {
    this.spinner.show();
    this.listOrderWard = [];
    this.dataOrderWard = null;
    let key = new FormData();
    key.append('orderDate', this.formatDate);
    // key.forEach((value, key) => {
    //   console.log(key + ' : ' + value);
    // });
    await this.services
      .post('DrugIden/orderAllAddictive', key)
      .then((value: any) => {
        // console.log(value);
        if (value.connect) {
          if (value.rowCount > 0) {
            this.listOrderWard = value.result;
            this.dataOrderWard = new MatTableDataSource(this.listOrderWard);
            this.dataOrderWard.sort = this.sortOrderWard;
            this.dataOrderWard.paginator = this.paginOrderWard;
          }
        } else {
          this.services.alert(
            'error',
            'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
            'โปรดติดต่อผู้ดูแลระบบ'
          );
        }
      });
    this.spinner.hide();
  }

  async viewDetail(data: any) {
    let unitPrice: any = data.priceReturn / data.qtyReturn;
    this.formDrug.patchValue({
      orderDate: data.orderDate,
      orderTime: data.orderTime,
      wardName: data.wardName,
      hn: data.hn,
      fullname: data.fullname,
      drugCode: data.drugCode,
      drugName: data.drugName,
      qtyReq: data.qtyReq,
      qtyReturn: data.qtyReturn,
      ampReturn: data.ampReturn,
      unitPrice: unitPrice,
      priceReturn: data.priceReturn,
      qtyUse: data.qtyUse,
    });
    _window.$(`#staticBackdrop`).modal('show');
  }

  submitImport() {
    if (this.formDrug.valid) {
      this.services
        .confirm('warning', 'ยืนยันจบการคืน', '')
        .then((val: any) => {
          if (val) {
            this.spinner.show();
            let priceReturn: any =
              this.formDrug.value.qtyReturn * this.formDrug.value.unitPrice;
            let qtyUse: any =
              this.formDrug.value.qtyReq - this.formDrug.value.qtyReturn;
            let key = new FormData();
            key.append('orderDate', this.formDrug.value.orderDate);
            key.append('orderTime', this.formDrug.value.orderTime);
            key.append('hn', this.formDrug.value.hn);
            key.append('drugCode', this.formDrug.value.drugCode);
            key.append('qtyReturn', this.formDrug.value.qtyReturn);
            key.append('ampReturn', this.formDrug.value.ampReturn);
            key.append('priceReturn', priceReturn);
            key.append('qtyUse', qtyUse);
            key.append('orderStatus', 'จบการคืน');
            // key.forEach((value, key) => {
            //   console.log(key + ' : ' + value);
            // });
            this.services
              .post('DrugIden/confirmAddictive', key)
              .then(async (value: any) => {
                // console.log(value);
                this.spinner.hide();
                if (value.connect) {
                  if (value.rowCount > 0) {
                    _window.$(`#staticBackdrop`).modal('hide');
                    await this.start();
                    this.services.alertTimer('success', 'จบการคืนสำเร็จ', '');
                  } else {
                    this.services.alertTimer(
                      'warning',
                      'จบการคืนไม่สำเร็จ',
                      ''
                    );
                  }
                } else {
                  this.services.alert(
                    'error',
                    'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                    'โปรดติดต่อผู้ดูแลระบบ'
                  );
                }
              });
          }
        });
    }
  }

  oderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataOrderWard.filter = filterValue.trim().toLowerCase();
  }
}
