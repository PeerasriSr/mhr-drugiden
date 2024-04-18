import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';

const _window: any = window;

@Component({
  selector: 'app-order-inward',
  templateUrl: './order-inward.component.html',
  styleUrls: ['./order-inward.component.scss'],
})
export class OrderInwardComponent implements OnInit {
  intervalId: any;
  listRaqFloorSk: Array<any> = [];
  newWindow: Window | null = null;

  isLoading = false;
  // showDetail = false;
  wardCode: any;
  wardName: any;
  patientHN: any;
  patientAN: any;
  patientNM: any;
  patientBed: any;
  patientAller: any = [];
  reqDate: any;
  reqNo: any;

  formatDate: any = null;
  formattedDate = moment(new Date()).format('YYYY-MM-DD');
  dateTH: any = null;

  campaign = new FormGroup({
    picker: new FormControl(new Date(new Date().setDate(new Date().getDate()))),
  });

  listOrderWard: Array<any> = [];
  dataOrderWard: any;
  @ViewChild('sortOrderWard') sortOrderWard!: MatSort;
  @ViewChild('paginOrderWard') paginOrderWard!: MatPaginator;
  displayOrderWard: string[] = [
    'row_number',
    'reqDate',
    // 'reqTime',
    'reqNo',
    'hn',
    'an',
    'firstname',
    // 'lastname',
    'wardcode',
    'ward_name',
    'bedcode',

  ];

  listOrderDetail: Array<any> = [];
  dataOrderDetail: any;
  @ViewChild('sortOrderDetail') sortOrderDetail!: MatSort;
  @ViewChild('paginOrderDetail') paginOrderDetail!: MatPaginator;
  displayOrderDetail: string[] = [
    'row_number',
    'img',
    // 'startIssDate',
    // 'drugCode',
    'orderitemname',
    'lamedText',
    'qtyReq',
    // 'uPrice',
  ];

  constructor(public services: AppService, private dialog: MatDialog) {
    this.wardCode = sessionStorage.getItem('location');
    this.wardName = sessionStorage.getItem('locationNm');
    this.formatDate = new Date(new Date().setDate(new Date().getDate()));
    this.dateTH = sessionStorage.getItem('dateTH');
    this.getRequest();
    // setTimeout(() => {
    //   this.checkOrderFloorStock();
    // }, 5000);
    this.runtime();
  }

  ngOnInit(): void {}

  runtime() {
    // this.intervalId = setInterval(() => {
    //   this.getRequest();
    //   this.checkOrderFloorStock();
    // }, 1000 * 30);
  }

  checkOrderFloorStock() {
    this.listRaqFloorSk = [];
    let key = new FormData();
    key.append('wardCode', this.wardCode);
    this.services.post('DrugIden/checkReqFloorSk', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listRaqFloorSk = value.result;
          const currentDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm');
          let arr: any = [];
          arr +=
            `<div style="text-align: center;"><h2>` +
            this.wardName +
            `</h2><p>มีรายการยาตู้ Med Dispense ` +
            currentDateTime +
            ` น. <br><br>`;
          arr += `<table>
            <tr>
              <th>ลำดับ</th>
              <th>HN</th>
              <th>ชื่อ-สกุล</th>
              <th>เตียง</th>
            </tr>`;
          this.listRaqFloorSk.forEach((el, i) => {
            let n = i + 1;
            // arr += el.Hn + ' ' + el.PatientName + '<br>';
            arr +=
              `<tr>
              <td>` +
              n +
              `</td>
              <td>` +
              el.Hn +
              `</td>
              <td>` +
              el.PatientName +
              `</td>
              <td style="text-align: center;">` +
              el.BedNo +
              `</td>
            </tr>`;
          });
          arr += `</table></p><button id="closeButton">รับทราบ</button>
          </div>`;
          // console.log(arr);
          // this.newWindow = window.open(
          //   '',
          //   'myWindow',
          //   'width=600,height=400'
          // );
          // if (this.newWindow) {
          //   this.newWindow.document.write(arr);
          // }

          if (this.newWindow) {
            this.newWindow.close();
          }
          this.newWindow = window.open('', 'myWindow', 'width=400,height=400');
          if (this.newWindow) {
            this.newWindow.document.write(arr);
            this.addButtonToCloseWindow();
            this.setWindowBackgroundColor();
          }
          // clearInterval(this.intervalId);
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

  addButtonToCloseWindow() {
    const closeButton = this.newWindow?.document.getElementById('closeButton');
    if (closeButton) {
      // closeButton.style.backgroundColor = 'orange';
      closeButton.style.fontSize = '18px';
      closeButton.onclick = () => {
        this.newWindow?.close();
        // this.runtime();
      };
    }
  }

  setWindowBackgroundColor() {
    const body = this.newWindow?.document.body;
    if (body) {
      body.style.color = '#00000';
      body.style.backgroundColor = 'orange';
    }
  }

  async dateChange(event: any) {
    this.formatDate = new Date(event.value);
    this.formattedDate = moment(this.formatDate).format('YYYY-MM-DD');
    this.getRequest();
  }

  getRequest = async () => {
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
    });
  };

  viewDetail = async (e: any) => {
    // console.log(e);
    this.isLoading = true;
    // this.showDetail = true;
    this.patientHN = e.hn;
    this.patientAN = e.an;
    this.patientNM = e.titlename + ' ' + e.firstname + ' ' + e.lastname;
    this.patientBed = e.bedcode;
    this.reqNo = e.reqNo;
    this.reqDate = e.reqDate;
    let key = new FormData();
    key.append('orderNo', e.reqNo);
    key.append('hn', e.hn);
    key.append('reqDate', this.formatDate_th_to_en(e.thDate));
    // key.forEach((value, key) => {
    //             console.log(key + ' : ' + value);
    //           });
    this.services.post('DrugIden/orderDetail', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listOrderDetail = value.result;
          // console.log(this.listOrderDetail);
          this.dataOrderDetail = new MatTableDataSource(this.listOrderDetail);
          this.dataOrderDetail.sort = this.sortOrderDetail;
          this.dataOrderDetail.paginator = this.paginOrderDetail;
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
              this.isLoading = false;
            });
            // if (el.lamedText1.length > 0) {
            //   let text = el.lamedText1;
            //   el.lamedText1 = text.split(',')[0];
            //   el.lamedText2 = text.split(',')[1];
            // }
          });
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
      this.isLoading = false;
      _window.$(`#orderDetail`).modal('show');
    });
    this.services.post('DrugIden/hnAllergy', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          let arr: Array<any> = [];
          arr = value.result;
          arr.forEach((el) => {
            this.patientAller += el.drugName + ' ';
          });
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
      // showConfirmButton: false,
      // showCloseButton: true,
      // width: `800px`,
    });
  };

  // back = async () => {
  //   this.showDetail = false;
  //   this.listOrderDetail = [];
  //   this.dataOrderDetail = null;
  // };

  formatDate_th_to_en(e: any) {
    const parsedDate = moment(e, 'YYYYMMDD');
    const subtractedDate = parsedDate.subtract(543, 'years');
    const formattedDate = subtractedDate.format('YYYY-MM-DD');
    return formattedDate;
  }
}
