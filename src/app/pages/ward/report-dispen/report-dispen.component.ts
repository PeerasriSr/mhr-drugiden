import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-dispen',
  templateUrl: './report-dispen.component.html',
  styleUrls: ['./report-dispen.component.scss'],
})
export class ReportDispenComponent implements OnInit {
  listWard: Array<any> = [];
  wardCode: any;

  startDate: any;
  endDate: any;

  listOrder: Array<any> = [];
  dataOrder: any;
  @ViewChild('sortOrder') sortOrder!: MatSort;
  @ViewChild('paginOrder') paginOrder!: MatPaginator;
  displayOrder: string[] = [
    'LastModify',
    'Hn',
    'PatientName',
    'DrugName',
    'DispensedTotalDose',
    'DispensedUnit',
    'Lotno',
    'DispenseDatetime',
    'Fullname',
    'TimeDifference',
  ];

  campaignOne = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  constructor(public services: AppService, private spinner: NgxSpinnerService) {
    this.wardCode = sessionStorage.getItem('location');
    this.startDate = moment(this.campaignOne.value.start).format('YYYY-MM-DD');
    this.endDate = moment(this.campaignOne.value.end).format('YYYY-MM-DD');
    this.getHitDispen();
  }

  ngOnInit(): void {}

  startChange(event: any) {
    const momentDate = new Date(event.value);
    this.startDate = moment(momentDate).format('YYYY-MM-DD');
  }

  endChange(event: any) {
    const momentDate = new Date(event.value);
    this.endDate = moment(momentDate).format('YYYY-MM-DD');
    if (this.endDate !== '1970-01-01') {
      this.getHitDispen();
    }
  }

  getHitDispen() {
    this.listOrder = [];
    this.dataOrder = null;
    this.spinner.show();
    let key = new FormData();
    key.append('wardCode', this.wardCode);
    key.append('startDate', this.startDate);
    key.append('endDate', this.endDate);
    // key.forEach((value, key) => {
    //   console.log(key + ' : ' + value);
    // });
    this.services.post('DrugIden/meddispenHit', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listOrder = value.result;
          // console.log(this.listOrder);
          this.dataOrder = new MatTableDataSource(this.listOrder);
          this.dataOrder.sort = this.sortOrder;
          this.dataOrder.paginator = this.paginOrder;
        }
      } else {
        this.services.alert(
          'error',
          'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
          'โปรดติดต่อผู้ดูแลระบบ'
        );
      }
      this.spinner.hide();
    });
  }
}
