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
  selector: 'app-report-dispens',
  templateUrl: './report-dispens.component.html',
  styleUrls: ['./report-dispens.component.scss'],
})
export class ReportDispensComponent implements OnInit {
  startDate: any;
  endDate: any;
  campaignOne = new FormGroup({
    start: new FormControl(new Date()),
    end: new FormControl(new Date()),
  });

  listOrder: Array<any> = [];
  dataOrder: any;
  @ViewChild('sortOrder') sortOrder!: MatSort;
  @ViewChild('paginOrder') paginOrder!: MatPaginator;
  displayOrder: string[] = ['DrugName', 'SumDispensedQty'];

  constructor(
    public services: AppService,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.startDate = moment(this.campaignOne.value.start).format('YYYY-MM-DD');
    this.endDate = moment(this.campaignOne.value.end).format('YYYY-MM-DD');
    await this.getDrugDispen();
  }

  async startChange(event: any) {
    this.startDate = moment(new Date(event.value)).format('YYYY-MM-DD');
  }

  async endChange(event: any) {
    this.endDate = moment(new Date(event.value)).format('YYYY-MM-DD');
    if (this.endDate !== '1970-01-01') {
      await this.getDrugDispen();
    }
  }

  async getDrugDispen() {
    this.spinner.show();
    this.listOrder = [];
    this.dataOrder = null;
    let formData = new FormData();
    formData.append('startDate', this.startDate);
    formData.append('endDate', this.endDate);
    this.services
      .post('DrugIden/medListDispen', formData)
      .then((value: any) => {
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
