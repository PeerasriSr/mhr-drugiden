import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

const _window: any = window;
@Component({
  selector: 'app-homemed-display',
  templateUrl: './homemed-display.component.html',
  styleUrls: ['./homemed-display.component.scss'],
})
export class HomemedDisplayComponent implements OnInit {
  ip: any;
  myInterval: any;
  homeMed: any;

  constructor(public services: AppService) {
    this.ip = sessionStorage.getItem('ip');
  }

  ngOnInit(): void {
    this.myInterval = setInterval(() => {
      this.getData();
    }, 1000);
  }

  getData() {
    let formData = new FormData();
    formData.append('ip', this.ip);
    this.services
      .post('DrugIden/selectDisplay', formData)
      .then((value: any) => {
        // console.log(value);
        if (value.connect) {
          if (value.rowCount > 0) {
            this.homeMed = value.result[0];
            // console.log(this.homeMed);
          } else {
            this.homeMed = null;
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
}
