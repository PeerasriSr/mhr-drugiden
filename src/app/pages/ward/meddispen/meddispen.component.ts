import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-meddispen',
  templateUrl: './meddispen.component.html',
  styleUrls: ['./meddispen.component.scss'],
})
export class MeddispenComponent implements OnInit {
  deviceLocat: any;
  interval: any;

  listOrder: Array<any> = [];
  dataOrder: any;
  @ViewChild('sortOrder') sortOrder!: MatSort;
  @ViewChild('paginOrder') paginOrder!: MatPaginator;
  displayOrder: string[] = [
    'PrescriptionNo',
    'Hn',
    'PatientName',
    'BedNo',
    'NumItem',
    'LastModify',
  ];

  constructor(
    private services: AppService,
    private spinner: NgxSpinnerService
  ) {
    this.deviceLocat = sessionStorage.getItem('location');
  }

  ngOnInit(): void {
    this.getOrder();
    this.interval = setInterval(() => {
      this.getOrder();
    }, 60 * 1000);
  }

  getOrder() {
    this.spinner.show();
    this.listOrder = [];
    this.dataOrder = null;
    let key = new FormData();
    key.append('wardCode', this.deviceLocat);
    this.services.post('DrugIden/listOrderFlsk', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listOrder = value.result;
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
