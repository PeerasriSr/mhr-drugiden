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
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  listAllDrug: Array<any> = [];
  dataAllDrug: any = null;
  @ViewChild('sortAlldrug') sortAlldrug!: MatSort;
  @ViewChild('paginatorAllDrug') paginatorAllDrug!: MatPaginator;
  displayAllDrug: string[] = [
    // 'drugCode',
    'img',
    'drugName',
  ];

  constructor(
    public services: AppService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllDrug();
  }

  getAllDrug() {
    this.spinner.show();
    this.listAllDrug = [];
    this.dataAllDrug = [];
    this.services.get('DrugIden/allDrugHomeC').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
        this.listAllDrug = value['result'];
        // console.log(this.listAllDrug);
        this.listAllDrug.forEach((e) => {
          this.services.getImg(e.drugCode).then((value: any) => {
            // console.log(value);
            if (value.connect) {
              if (value[0]) {
                let arr = value;
                let maxKey = -Infinity;
                for (const key in arr) {
                  if (!isNaN(Number(key)) && Number(key) > maxKey) {
                    maxKey = Number(key);
                  }
                }
                // console.log(maxKey);
                const imgPath = arr[maxKey]['pathImage'].substring(
                  arr[maxKey]['pathImage'].indexOf(
                    'api/assets/drug-imagecenter'
                  )
                );
                // console.log(this.services.rootPath + imgPath);
                e.img = this.services.rootPath + imgPath;
              }
            }
          });
        });
        this.dataAllDrug = new MatTableDataSource(this.listAllDrug);
        this.dataAllDrug.sort = this.sortAlldrug;
        this.dataAllDrug.paginator = this.paginatorAllDrug;
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

  drugFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAllDrug.filter = filterValue.trim().toLowerCase();
  }

  viewImg = async (e: any) => {
    Swal.fire({
      title: e.drugName,
      imageUrl: e.img,
      imageAlt: 'Popup Image',
      confirmButtonText: 'ปิด',
      // showConfirmButton: false,
      // showCloseButton: true,
      // width: `800px`,
    });
  };
}
