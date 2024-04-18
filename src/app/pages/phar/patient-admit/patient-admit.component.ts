import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
const _window: any = window;

@Component({
  selector: 'app-patient-admit',
  templateUrl: './patient-admit.component.html',
  styleUrls: ['./patient-admit.component.scss'],
})
export class PatientAdmitComponent implements OnInit {
  wardCode: any;
  wardName: any;
  siteName: any;
  allPatient: Array<any> = [];
  inAllergy: Array<any> = [];
  outAllergy: Array<any> = [];
  numCheck: any;

  selectPatient: any = null;
  allAllergy: Array<any> = [];

  focusPatient: Array<any> = [];
  dataFocus: any = null;
  @ViewChild('sortFocus') sortFocus!: MatSort;
  @ViewChild('paginatorFocus') paginatorFocus!: MatPaginator;
  displayFocus: string[] = [
    'admit_date_en',
    'admit_time_en',
    'hn',
    'firstName',
    'out_allergy',
    'in_allergy',
    'matches',
    'notmatch',
  ];

  totalPatient: Array<any> = [];
  dataTotal: any = null;
  @ViewChild('sortTotal') sortTotal!: MatSort;
  @ViewChild('paginatorTotal') paginatorTotal!: MatPaginator;
  displayTotal: string[] = [
    'admit_date_en',
    'admit_time_en',
    'hn',
    'firstName',
    'out_allergy',
    'in_allergy',
    'matches',
    'notmatch',
  ];

  constructor(public services: AppService, private spinner: NgxSpinnerService) {
    this.wardCode = sessionStorage.getItem('location');
    this.wardName = sessionStorage.getItem('locationNm');
    this.siteName = sessionStorage.getItem('siteName');
    // console.log(this.siteName);
  }

  ngOnInit(): void {
    this.getPatient();
  }

  getPatient() {
    this.spinner.show();
    this.focusPatient = [];
    this.dataFocus = null;
    this.allAllergy = [];
    this.allPatient = [];
    let listHn = '';
    this.inAllergy = [];
    this.outAllergy = [];
    let ward = new FormData();
    ward.append('wardCode', this.wardCode);
    this.services
      .post('DrugIden/admitToSite', ward)
      .then(async (value: any) => {
        // console.log(value);
        if (value.connect) {
          if (value.rowCount > 0) {
            this.allPatient = value['result'];
            // console.log(this.allPatient);
            
            // console.log(this.allPatient.length);
            this.allPatient.forEach((e) => {
              listHn += "'" + e.hn.trim() + "',";
            });
            // console.log(listHn);
            let key = new FormData();
            key.append('listHn', listHn.substring(0, listHn.length - 1));
            await this.services
              .post('DrugIden/inAllergy', key)
              .then((value: any) => {
                // console.log(value);
                if (value.connect) {
                  if (value.rowCount > 0) {
                    this.inAllergy = value['result'];
                  }
                } else {
                  this.services.alert(
                    'error',
                    'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                    'โปรดติดต่อผู้ดูแลระบบ'
                  );
                }
              });
            await this.services
              .post('DrugIden/outAllergy', key)
              .then((value: any) => {
                // console.log(value);
                if (value.connect) {
                  if (value.rowCount > 0) {
                    this.outAllergy = value['result'];
                    // console.log(this.outAllergy.length);
                  }
                } else {
                  this.services.alert(
                    'error',
                    'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                    'โปรดติดต่อผู้ดูแลระบบ'
                  );
                }
              });
            this.numCheck = 0;
            await this.services
              .post('DrugIden/checkAllergy', key)
              .then((value: any) => {
                // console.log(value);
                if (value.connect) {
                  if (value.rowCount > 0) {
                    this.numCheck = value.rowCount;
                  }
                } else {
                  this.services.alert(
                    'error',
                    'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                    'โปรดติดต่อผู้ดูแลระบบ'
                  );
                }
              });
            await this.allPatient.forEach((e) => {
              let drugIn: any = [];
              let drugOut: any = [];
              let drugMah: any = [];
              let drugNot: any = [];
              if (this.inAllergy.length > 0) {
                this.inAllergy.forEach((i) => {
                  if (e.hn.trim() === i.hn) {
                    e.in_allergy++;
                    drugIn.push(i.fullDrugName);
                  }
                });
              }
              if (this.outAllergy.length > 0) {
                this.outAllergy.forEach((o) => {
                  // console.log(o);
                  if (e.hn.trim() === o.patientID) {
                    o.patientName = e.firstName + ' ' + e.lastName;
                    e.out_allergy++;
                    drugOut.push(o.fullDrugName);
                    if (this.inAllergy.length > 0) {
                      let check: boolean = false;
                      this.inAllergy.forEach((i, index) => {
                        if (
                          i.drugName
                            .toUpperCase()
                            .includes(o.drugName.toUpperCase()) &&
                          e.hn.trim() === i.hn
                        ) {
                          drugMah.push(o.fullDrugName);
                          e.matches++;
                          check = true;
                        }
                      });
                      if (!check) {
                        drugNot.push(o);
                        this.allAllergy.push(o);
                      }
                    }
                  }
                });
                e.notmatch = e.out_allergy - e.matches;
                e.in_drug = drugIn;
                e.out_drug = drugOut;
                e.math_drug = [...new Set(drugMah)];
                e.not_drug = [...new Set(drugNot)];
                if (e.notmatch > 0) {
                  this.focusPatient.push(e);
                }
                if (e.out_allergy > 0) {
                  this.totalPatient.push(e);
                }
              }
            });
            // console.log(this.allAllergy);
            // console.log(this.focusPatient);
            // console.log(this.totalPatient);
            this.dataFocus = new MatTableDataSource(this.focusPatient);
            this.dataFocus.sort = this.sortFocus;
            this.dataFocus.paginator = this.paginatorFocus;
            this.dataTotal = new MatTableDataSource(this.totalPatient);
            this.dataTotal.sort = this.sortTotal;
            this.dataTotal.paginator = this.paginatorTotal;
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

  selectPat(data: any) {
    // console.log(data);
    this.selectPatient = data;
    _window.$(`#listDrug`).modal('show');
  }

  claer() {
    this.selectPatient = null;
  }

  exportAllAllergy() {
    const date = moment();

    // console.log(this.allAllergy);
    // Create a worksheet
    const XLSX = require('xlsx');
    // Specify the columns to include
    const columnsToInclude = [
      'patientID',
      'patientName',
      'fullDrugName',
      'causality',
      'information',
      'allergyLevel',
    ];

    // Map original column names to the desired column names
    const columnMappings: any = {
      patientID: 'HN',
      patientName: 'ชื่อ-สกุล',
      fullDrugName: 'รายการยา',
      causality: 'Causality',
      information: 'Information',
      allergyLevel: 'Allergy Level',
    };

    // Extract headers based on the specified columns and apply column name mappings
    const headers = columnsToInclude.map(
      (column) => columnMappings[column] || column
    );

    // Create a worksheet with selected columns and custom column names
    const ws = XLSX.utils.json_to_sheet(
      [
        headers,
        ...this.allAllergy.map((obj) =>
          columnsToInclude.map((key) => obj[key])
        ),
      ],
      { skipHeader: true }
    );

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook to a file
    XLSX.writeFile(
      wb,
      `รายการแพ้ยา(${date.format('YYYY-MM-DD HH:mm:ss')}).xlsx`
    );
  }
}
