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
  selector: 'app-report-floorsk',
  templateUrl: './report-floorsk.component.html',
  styleUrls: ['./report-floorsk.component.scss'],
})
export class ReportFloorskComponent implements OnInit {
  listWard: Array<any> = [];
  wardCode: any;

  startDate: any = null;
  endDate: any = null;

  campaignOne = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

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

  constructor(public services: AppService, private spinner: NgxSpinnerService) {
    this.startDate = moment(this.campaignOne.value.start).format('YYYY-MM-DD');
    this.endDate = moment(this.campaignOne.value.end).format('YYYY-MM-DD');
  }

  async ngOnInit(): Promise<void> {
    await this.getWard();
  }

  async getWard() {
    this.listWard = [];
    this.services.get('DrugIden/listWard').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listWard = value.result;
          // console.log(this.listWard);
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

  async startChange(event: any) {
    this.startDate = moment(new Date(event.value)).format('YYYY-MM-DD');
  }

  async endChange(event: any) {
    this.endDate = moment(new Date(event.value)).format('YYYY-MM-DD');
    if (this.endDate !== '1970-01-01') {
      await this.submitSeach();
    }
  }

  async selectWard(e: any) {
    this.wardCode = e.value;
    await this.submitSeach();
    // console.log(this.wardCode);
    // if (this.wardCode) {
    //   this.submitSearch(this.wardCode);
    // }
  }

  async submitSeach() {
    if (this.wardCode) {
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
          } else {
            // this.services.alert(
            //   'warning',
            //   'ไม่พบข้อมูลของหอผู้ป่วยที่ท่านเลือก',
            //   ''
            // );
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
    } else {
      this.services.alert('warning', 'กรุณาเลือกหอผู้ป่วย', '');
    }
  }
}
