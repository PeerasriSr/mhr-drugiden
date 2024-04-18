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
  selector: 'app-drug-return',
  templateUrl: './drug-return.component.html',
  styleUrls: ['./drug-return.component.scss'],
})
export class DrugReturnComponent implements OnInit {
  wardCode: any;
  wardName: any;
  userName: any;
  formatDate: any;
  dateTH: any;

  campaign = new FormGroup({
    picker: new FormControl(new Date(new Date().setDate(new Date().getDate()))),
  });

  listAddictive: Array<any> = [];
  listOrderAddictive: Array<any> = [];
  listOrderWard: Array<any> = [];
  dataOrderWard: any;
  @ViewChild('sortOrderWard') sortOrderWard!: MatSort;
  @ViewChild('paginOrderWard') paginOrderWard!: MatPaginator;
  displayOrderWard: string[] = [
    'reqTime',
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
    reqTime: new FormControl('', [Validators.required]),
    hn: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    wardcode: new FormControl('', [Validators.required]),
    drugCode: new FormControl('', [Validators.required]),
    drugName: new FormControl('', [Validators.required]),
    qtyReq: new FormControl('', [Validators.required]),
    qtyReturn: new FormControl('', [Validators.required]),
    ampReturn: new FormControl('', [Validators.required]),
    uprice: new FormControl('', [Validators.required]),
    iden: new FormControl('', [Validators.required]),
    destroyer: new FormControl('', [Validators.required]),
    witness: new FormControl('', [Validators.required]),
  });

  constructor(
    public services: AppService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.wardCode = sessionStorage.getItem('location');
    this.wardName = sessionStorage.getItem('locationNm');
    this.userName = sessionStorage.getItem('userName');
    // console.log(this.userName);
    this.formatDate = moment(new Date()).format('YYYY-MM-DD');
    // console.log(this.wardCode);
    await this.drugAddictive();
    await this.start();
  }

  async dateChange(event: any) {
    this.formatDate = moment(new Date(event.value)).format('YYYY-MM-DD');
    await this.start();
  }

  async start() {
    await this.orderWardAddictive();
    await this.detailOrderInWard();
  }

  async drugAddictive() {
    this.spinner.show();
    this.listAddictive = [];
    await this.services.get('DrugIden/drugAddictive').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listAddictive = value.result;
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

  async orderWardAddictive() {
    this.spinner.show();
    this.listOrderAddictive = [];
    let key = new FormData();
    key.append('orderDate', this.formatDate);
    key.append('wardcode', this.wardCode);
    // key.forEach((value, key) => {
    //   console.log(key + ' : ' + value);
    // });
    await this.services
      .post('DrugIden/orderWardAddictive', key)
      .then((value: any) => {
        // console.log(value);
        if (value.connect) {
          if (value.rowCount > 0) {
            this.listOrderAddictive = value.result;
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

  async detailOrderInWard() {
    this.spinner.show();
    this.dateTH =
      (parseInt(moment(this.formatDate).format('YYYY')) + 543).toString() +
      moment(this.formatDate).format('MMDD');
    this.listOrderWard = [];
    this.dataOrderWard = null;
    let key = new FormData();
    key.append('dateTH', this.dateTH);
    key.append('wardCode', this.wardCode);
    await this.services
      .post('DrugIden/detailOrderInWard', key)
      .then((value: any) => {
        // console.log(value);
        if (value.connect) {
          if (value.rowCount > 0) {
            let arr: Array<any> = [];
            arr = value.result;
            this.listOrderWard = arr.filter((e) =>
              this.listAddictive.some((l) => e.drugCode === l.drugCode)
            );
            this.listOrderWard = this.listOrderWard.map((e) => {
              const found = this.listOrderAddictive.find(
                (l) =>
                  e.reqTime === l.orderTime &&
                  e.hn === l.hn &&
                  e.drugCode === l.drugCode
              );
              if (found) {
                return {
                  ...e,
                  qtyReturn: found.qtyReturn,
                  ampReturn: found.ampReturn,
                  priceReturn: found.priceReturn,
                  qtyUse: found.qtyUse,
                  iden: found.iden,
                  destroyer: found.destroyer,
                  witness: found.witness,
                  orderStatus: found.orderStatus,
                };
              }
              return e;
            });
            // console.log(this.listOrderWard.length > 0);
            if (this.listOrderWard.length > 0) {
              this.dataOrderWard = new MatTableDataSource(this.listOrderWard);
              this.dataOrderWard.sort = this.sortOrderWard;
              this.dataOrderWard.paginator = this.paginOrderWard;
            }
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

  oderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataOrderWard.filter = filterValue.trim().toLowerCase();
  }

  viewDetail(data: any) {
    // console.log(data);
    this.formDrug.patchValue({
      reqTime: data.reqTime,
      hn: data.hn,
      fullname: data.titlename + '' + data.firstname + ' ' + data.lastname,
      wardcode: data.wardcode,
      drugCode: data.drugCode,
      drugName: data.drugName,
      qtyReq: data.qtyReq,
      uprice: data.uprice,
      iden: this.userName,
    });
    _window.$(`#staticBackdrop`).modal('show');
  }

  submitImport() {
    if (this.formDrug.valid) {
      this.services
        .confirm('warning', 'ยืนยันการคืนยา', '')
        .then((val: any) => {
          if (val) {
            this.spinner.show();
            let priceReturn: any =
              this.formDrug.value.qtyReturn * this.formDrug.value.uprice;
            let qtyUse: any =
              this.formDrug.value.qtyReq - this.formDrug.value.qtyReturn;
            let key = new FormData();
            key.append('orderDate', this.formatDate);
            key.append('orderTime', this.formDrug.value.reqTime);
            key.append('hn', this.formDrug.value.hn);
            key.append('fullname', this.formDrug.value.fullname);
            key.append('drugCode', this.formDrug.value.drugCode);
            key.append('drugName', this.formDrug.value.drugName);
            key.append('qtyReq', this.formDrug.value.qtyReq);
            key.append('qtyReturn', this.formDrug.value.qtyReturn);
            key.append('ampReturn', this.formDrug.value.ampReturn);
            key.append('priceReturn', priceReturn);
            key.append('qtyUse', qtyUse);
            key.append('iden', this.formDrug.value.iden);
            key.append('destroyer', this.formDrug.value.destroyer);
            key.append('witness', this.formDrug.value.witness);
            key.append('wardcode', this.wardCode);
            key.append('wardName', this.wardName);
            key.append('orderStatus', 'รอยืนยัน');
            // key.forEach((value, key) => {
            //   console.log(key + ' : ' + value);
            // });
            this.services
              .post('DrugIden/returnAddictive', key)
              .then(async (value: any) => {
                // console.log(value);
                this.spinner.hide();
                if (value.connect) {
                  if (value.rowCount > 0) {
                    _window.$(`#staticBackdrop`).modal('hide');
                    await this.start();
                    this.services.alertTimer('success', 'คืนยาสำเร็จ', '');
                  } else {
                    this.services.alertTimer('warning', 'คืนยาไม่สำเร็จ', '');
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
}
