import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-addictive',
  templateUrl: './report-addictive.component.html',
  styleUrls: ['./report-addictive.component.scss'],
})
export class ReportAddictiveComponent implements OnInit {
  listReport: Array<any> = [
    { id: 'item', name: 'ยาคืนหอผู้ป่วย' },
    { id: 'hn', name: 'ยาคืนคนไข้' },
  ];
  selectReport: any;
  listWard: Array<any> = [];
  selectWard: any;
  listTime: Array<any> = [
    { time: '00.00 - 08.00', start: '00.00', end: '08.00' },
    { time: '08.01 - 16.00', start: '08.01', end: '16.00' },
    { time: '16.01 - 23.59', start: '16.01', end: '23.59' },
  ];
  timeStart: any;
  timeEnd: any;
  campaign = new FormGroup({
    picker: new FormControl(new Date()),
  });
  formatDate: any;

  listItem: Array<any> = [];
  dataItem: any;
  @ViewChild('sortItem') sortItem!: MatSort;
  @ViewChild('paginItem') paginItem!: MatPaginator;
  displayItem: string[] = ['drugName', 'totalReturn', 'totalPrice'];
  @ViewChild('swiper') swiper!: ElementRef;

  constructor(
    public services: AppService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.formatDate = moment(new Date()).format('YYYY-MM-DD');
    await this.getWard();
  }

  async getWard() {
    this.listWard = [];
    this.services.get('DrugIden/listWard').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listWard = value.result;
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

  async changeWard(data: any) {
    this.selectWard = data.value;
    await this.itemAddictive();
  }

  async changeReport(event: any) {
    this.listItem = [];
    this.dataItem = null;
    this.selectReport = event.value.id;
    // console.log(this.selectReport);
  }

  async changeTime(event: any) {
    // const selectedValue = event.value;
    // console.log(selectedValue);
    this.timeStart = event.value.start;
    this.timeEnd = event.value.end;
    await this.itemAddictive();
  }

  async dateChange(event: any) {
    this.formatDate = moment(new Date(event.value)).format('YYYY-MM-DD');
    await this.itemAddictive();
  }

  async itemAddictive() {
    // console.log(this.selectWard, this.timeStart, this.timeEnd);
    this.spinner.show();
    let key = new FormData();
    key.append('orderDate', this.formatDate);
    key.append('wardcode', this.selectWard);
    key.append('startTime', this.timeStart);
    key.append('endTime', this.timeEnd);
    // key.forEach((value, key) => {
    //   console.log(key + ' : ' + value);
    // });
    this.listItem = [];
    this.dataItem = null;
    await this.services
      .post('DrugIden/itemAddictive', key)
      .then((value: any) => {
        // console.log(value);
        if (value.connect) {
          if (value.rowCount > 0) {
            this.listItem = value.result;
            this.dataItem = new MatTableDataSource(this.listItem);
            this.dataItem.sort = this.sortItem;
            this.dataItem.paginator = this.paginItem;
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

  async hnAddictive(hn: any) {
    // console.log(hn);
    this.spinner.show();
    let key = new FormData();
    key.append('orderDate', this.formatDate);
    key.append('hn', hn);
    key.append('startTime', this.timeStart);
    key.append('endTime', this.timeEnd);
    // key.forEach((value, key) => {
    //   console.log(key + ' : ' + value);
    // });
    this.listItem = [];
    this.dataItem = null;
    await this.services.post('DrugIden/hnAddictive', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listItem = value.result;
          this.dataItem = new MatTableDataSource(this.listItem);
          this.dataItem.sort = this.sortItem;
          this.dataItem.paginator = this.paginItem;
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
}
