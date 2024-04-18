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
  selector: 'app-order-allward',
  templateUrl: './order-allward.component.html',
  styleUrls: ['./order-allward.component.scss']
})
export class OrderAllwardComponent implements OnInit {
  showDetail = false;

  listWard: Array<any> = [];

  patientHN: any;
  patientAN: any;
  patientNM: any;
  patientAller: any;
  patientBed: any;
  reqDate: any;
  reqNo: any;

  formatDate: any = null;
  formattedDate = moment(new Date()).format('YYYY-MM-DD');
  dateTH: any = null;
  wardCode: any = null;

  campaign = new FormGroup({
    picker: new FormControl(new Date(new Date().setDate(new Date().getDate()))),
  });

  listOrderWard: Array<any> = [];
  dataOrderWard: any;
  @ViewChild('sortOrderWard') sortOrderWard!: MatSort;
  @ViewChild('paginOrderWard') paginOrderWard!: MatPaginator;
  displayOrderWard: string[] = [
    // 'row_number',
    'reqDate',
    // 'reqTime',
    'reqNo',
    'hn',
    'an',
    'firstname',
    // 'lastname',
    // 'wardcode',
    'ward_name',
    'bedcode',
    // 'note',
  ];

  listOrderDetail: Array<any> = [];
  dataOrderDetail: any;
  @ViewChild('sortOrderDetail') sortOrderDetail!: MatSort;
  @ViewChild('paginOrderDetail') paginOrderDetail!: MatPaginator;
  displayOrderDetail: string[] = [
    'row_number',
    // 'startIssDate',
    // 'drugCode',
    'orderitemname',
    'lamedText',
    'qtyReq',
    // 'uPrice',
    'img',
  ];

  constructor(public services: AppService, private spinner: NgxSpinnerService) {
    this.formatDate = new Date(new Date().setDate(new Date().getDate()));
    this.dateTH = sessionStorage.getItem('dateTH');
    this.wardCode = sessionStorage.getItem('wardCode');
    // if (this.dateTH && this.wardCode) {
    //   // this.submitSearch();
    //   this.submitSearch(this.wardCode);
    // }
  }

  ngOnInit(): void {
    this.getWard();
  }

  getWard = async () => {
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
  };

  selectWard(e: any) {
    this.wardCode = e.value;
    // console.log(this.wardCode);
    // if (this.wardCode) {
    //   this.submitSearch(this.wardCode);
    // }
  }

  async dateChange(event: any) {
    this.formatDate = new Date(event.value);
    this.formattedDate = moment(this.formatDate).format('YYYY-MM-DD');
    // this.getHistory();
    // if (this.dateTH && this.wardCode) {
    //   this.submitSearch(this.wardCode);
    // }
  }

  submitSearch = async () => {
    // console.log(this.dateTH);
    // console.log(this.wardCode);
    if (!this.wardCode) {
      this.services.alert('warning', 'กรุณาเลือกหอผู้ป่วย', '');
    } else {
      this.spinner.show();
      this.dateTH =
        (parseInt(moment(this.formatDate).format('YYYY')) + 543).toString() +
        moment(this.formatDate).format('MMDD');
      this.listOrderWard = [];
      this.dataOrderWard = null;
      let key = new FormData();
      key.append('dateTH', this.dateTH);
      key.append('wardCode', this.wardCode);
      this.services.post('DrugIden/OrderWard', key).then((value: any) => {
        // console.log(value);
        if (value.connect) {
          if (value.rowCount > 0) {
            this.listOrderWard = value.result;
            // console.log(this.listOrderWard);
            this.dataOrderWard = new MatTableDataSource(this.listOrderWard);
            this.dataOrderWard.sort = this.sortOrderWard;
            this.dataOrderWard.paginator = this.paginOrderWard;
          } else {
            this.services.alert(
              'warning',
              'ไม่พบข้อมูลของหอผู้ป่วยที่ท่านเลือก',
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
        this.spinner.hide();
      });
    }
  };

  viewDetail = async (e: any) => {
    // console.log(e);
    this.spinner.show();
    this.getAllergy(e);
    this.showDetail = true;
    this.patientHN = e.hn;
    this.patientAN = e.an;
    this.patientNM = e.titlename + ' ' + e.firstname + ' ' + e.lastname;
    this.patientBed = e.bedcode;
    this.reqNo = e.reqNo;
    this.reqDate = e.reqDate;
    let key = new FormData();
    key.append('orderNo', e.reqNo);
    this.services.post('DrugIden/orderDetail', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listOrderDetail = value.result;
          // console.log(this.listOrderDetail);
          this.listOrderDetail.forEach((el) => {
            this.services.getImg(el.drugCode).then((value: any) => {
              // console.log(value);
              if (value.connect) {
                let arr = value;
                // console.log(arr);
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
                el.img = this.services.rootPath + imgPath;
              } else {
                this.services.alert(
                  'error',
                  'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                  'โปรดติดต่อผู้ดูแลระบบ'
                );
              }
            });
          });
          this.dataOrderDetail = new MatTableDataSource(this.listOrderDetail);
          this.dataOrderDetail.sort = this.sortOrderDetail;
          this.dataOrderDetail.paginator = this.paginOrderDetail;
        } else {
          // this.services.alert(
          //   'warning',
          //   '',
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
  };

  getAllergy = async (e: any) => {
    this.patientAller = [];
    let key = new FormData();
    key.append('hn', e.hn);
    this.services.post('DrugIden/hnAllergy', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          let arr: Array<any> = [];
          arr = value.result;
          arr.forEach((el) => {
            // console.log(el.drugName);
            this.patientAller += el.drugName + ' ';
          });
        } else {
          this.patientAller = '-';
        }
      } else {
        this.services.alert(
          'error',
          'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
          'โปรดติดต่อผู้ดูแลระบบ'
        );
      }
    });
  };

  oderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataOrderWard.filter = filterValue.trim().toLowerCase();
  }

  viewImg = async (e: any) => {
    Swal.fire({
      title: e.orderitemname,
      imageUrl: e.img,
      imageAlt: 'Popup Image',
      confirmButtonText: 'ปิด',
      // width: `800px`,
    });
  };

  back = async () => {
    this.showDetail = false;
    this.listOrderDetail = [];
    this.dataOrderDetail = null;
  };
}
