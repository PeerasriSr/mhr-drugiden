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
  selector: 'app-check-request',
  templateUrl: './check-request.component.html',
  styleUrls: ['./check-request.component.scss'],
})
export class CheckRequestComponent implements OnInit {
  userID: any;
  userName: any;
  wardName: any;
  wardPhone: any;
  valueHN = '';
  valueReq = '';
  showDetail = false;

  patientAge: any;
  reqDateTh: any;
  reqStatus: any;

  ED = 0;
  NED = 0;
  MINE = 0;
  total = 0;
  checkCount = 0;
  patientAller: any;
  patientMSG: any;
  drugOff: any;
  patientIntx: Array<any> = [];
  drugLab: Array<any> = [];
  checkAll = 0;

  PN_prescription: Array<any> = [];
  PN_docc: Array<any> = [];
  PN_previous: Array<any> = [];

  orderRequest: any;
  PE_type: Array<any> = [];
  PE_oper: Array<any> = [];
  PE_seve: Array<any> = [];
  formPE = {
    type: '',
    oper: '',
    seve: '',
    name: '',
    use: '',
    qty: '',
  };

  PD_pers: Array<any> = [];
  PD_type: Array<any> = [];
  PD_cond: Array<any> = [];
  PD_proc: Array<any> = [];
  PD_prod: Array<any> = [];
  formPD = {
    type: '',
    type_note: '',
    pers: '',
    cond: '',
    cond_note: '',
    proc: '',
    proc_note: '',
    prod: '',
    prod_note: '',
  };

  formPN = {
    drug: '',
    prescription: '',
    docc: '',
    previous: '',
  };

  listAllRequest: Array<any> = [];
  dataAllRequest: any;
  @ViewChild('sortAllRequest') sortAllRequest!: MatSort;
  @ViewChild('paginAllRequest') paginAllRequest!: MatPaginator;
  displayAllRequest: string[] = [
    // 'row_number',
    // 'note',
    'reqDate',
    'reqType',
    // 'reqTime',
    'reqNo',
    'hn',
    'an',
    'firstname',
    // 'lastname',
    // 'wardcode',
    'ward_name',
    'bedcode',
  ];

  listOrderDetail: Array<any> = [];
  dataOrderDetail: any;
  @ViewChild('sortOrderDetail') sortOrderDetail!: MatSort;
  @ViewChild('paginOrderDetail') paginOrderDetail!: MatPaginator;
  displayOrderDetail: string[] = [
    'row_number',
    'startIssDate',
    // 'drugCode',
    'drugName',
    'lamedText',
    'qtyReq',
    'u_price',
    'img',
  ];
  labDetail: Array<any> = [];
  Scr: any;
  eGFR: any;
  K: any;
  numOrderCheck = 0;

  listDrugPN: Array<any> = [];

  setPEtype: any;
  setPEoper: any;
  setPEseve: any;
  setPDtype: any;
  setPDpers: any;
  setPDcond: any;
  setPDproc: any;
  setPDprod: any;
  setMedError: any;
  arrMedError: Array<any> = [];

  Ascii = [
    { hex: '20', dec: 32, char: ' ' },
    { hex: '21', dec: 33, char: '!' },
    { hex: '22', dec: 34, char: '"' },
    { hex: '23', dec: 35, char: '#' },
    { hex: '24', dec: 36, char: '$' },
    { hex: '25', dec: 37, char: '%' },
    { hex: '26', dec: 38, char: '&' },
    { hex: '27', dec: 39, char: "'" },
    { hex: '28', dec: 40, char: '(' },
    { hex: '29', dec: 41, char: ')' },
    { hex: '2A', dec: 42, char: '*' },
    { hex: '2B', dec: 43, char: '+' },
    { hex: '2C', dec: 44, char: ',' },
    { hex: '2D', dec: 45, char: '-' },
    { hex: '2E', dec: 46, char: '.' },
    { hex: '2F', dec: 47, char: '/' },
    { hex: '30', dec: 48, char: '0' },
    { hex: '31', dec: 49, char: '1' },
    { hex: '32', dec: 50, char: '2' },
    { hex: '33', dec: 51, char: '3' },
    { hex: '34', dec: 52, char: '4' },
    { hex: '35', dec: 53, char: '5' },
    { hex: '36', dec: 54, char: '6' },
    { hex: '37', dec: 55, char: '7' },
    { hex: '38', dec: 56, char: '8' },
    { hex: '39', dec: 57, char: '9' },
    { hex: '3A', dec: 58, char: ':' },
    { hex: '3B', dec: 59, char: ';' },
    { hex: '3C', dec: 60, char: '<' },
    { hex: '3D', dec: 61, char: '=' },
    { hex: '3E', dec: 62, char: '>' },
    { hex: '3F', dec: 63, char: '?' },
    { hex: '40', dec: 64, char: '@' },
    { hex: '41', dec: 65, char: 'A' },
    { hex: '42', dec: 66, char: 'B' },
    { hex: '43', dec: 67, char: 'C' },
    { hex: '44', dec: 68, char: 'D' },
    { hex: '45', dec: 69, char: 'E' },
    { hex: '46', dec: 70, char: 'F' },
    { hex: '47', dec: 71, char: 'G' },
    { hex: '48', dec: 72, char: 'H' },
    { hex: '49', dec: 73, char: 'I' },
    { hex: '4A', dec: 74, char: 'J' },
    { hex: '4B', dec: 75, char: 'K' },
    { hex: '4C', dec: 76, char: 'L' },
    { hex: '4D', dec: 77, char: 'M' },
    { hex: '4E', dec: 78, char: 'N' },
    { hex: '4F', dec: 79, char: 'O' },
    { hex: '50', dec: 80, char: 'P' },
    { hex: '51', dec: 81, char: 'Q' },
    { hex: '52', dec: 82, char: 'R' },
    { hex: '53', dec: 83, char: 'S' },
    { hex: '54', dec: 84, char: 'T' },
    { hex: '55', dec: 85, char: 'U' },
    { hex: '56', dec: 86, char: 'V' },
    { hex: '57', dec: 87, char: 'W' },
    { hex: '58', dec: 88, char: 'X' },
    { hex: '59', dec: 89, char: 'Y' },
    { hex: '5A', dec: 90, char: 'Z' },
    { hex: '5B', dec: 91, char: '[' },
    // { hex: '5C', dec: 92, char: '\' },
    { hex: '5D', dec: 93, char: ']' },
    { hex: '5E', dec: 94, char: '^' },
    { hex: '5F', dec: 95, char: '_' },
    { hex: '60', dec: 96, char: '`' },
    { hex: '61', dec: 97, char: 'a' },
    { hex: '62', dec: 98, char: 'b' },
    { hex: '63', dec: 99, char: 'c' },
    { hex: '64', dec: 100, char: 'd' },
    { hex: '65', dec: 101, char: 'e' },
    { hex: '66', dec: 102, char: 'f' },
    { hex: '67', dec: 103, char: 'g' },
    { hex: '68', dec: 104, char: 'h' },
    { hex: '69', dec: 105, char: 'i' },
    { hex: '6A', dec: 106, char: 'j' },
    { hex: '6B', dec: 107, char: 'k' },
    { hex: '6C', dec: 108, char: 'l' },
    { hex: '6D', dec: 109, char: 'm' },
    { hex: '6E', dec: 110, char: 'n' },
    { hex: '6F', dec: 111, char: 'o' },
    { hex: '70', dec: 112, char: 'p' },
    { hex: '71', dec: 113, char: 'q' },
    { hex: '72', dec: 114, char: 'r' },
    { hex: '73', dec: 115, char: 's' },
    { hex: '74', dec: 116, char: 't' },
    { hex: '75', dec: 117, char: 'u' },
    { hex: '76', dec: 118, char: 'v' },
    { hex: '77', dec: 119, char: 'w' },
    { hex: '78', dec: 120, char: 'x' },
    { hex: '79', dec: 121, char: 'y' },
    { hex: '7A', dec: 122, char: 'z' },
    { hex: '7B', dec: 123, char: '{' },
    { hex: '7C', dec: 124, char: '|' },
    { hex: '7D', dec: 125, char: '}' },
    { hex: '7E', dec: 126, char: '~' },
    { hex: '80', dec: 128, char: '€' },
    { hex: '85', dec: 133, char: '…' },
    { hex: '91', dec: 145, char: '‘' },
    { hex: '92', dec: 146, char: '’' },
    { hex: '93', dec: 147, char: '“' },
    { hex: '94', dec: 148, char: '”' },
    { hex: '95', dec: 149, char: '•' },
    { hex: '96', dec: 150, char: '–' },
    { hex: '97', dec: 151, char: '—' },
    { hex: 'A0', dec: 160, char: 'NO-BREAK SPACE' },
    { hex: 'A1', dec: 161, char: 'ก' },
    { hex: 'A2', dec: 162, char: 'ข' },
    { hex: 'A3', dec: 163, char: 'ฃ' },
    { hex: 'A4', dec: 164, char: 'ค' },
    { hex: 'A5', dec: 165, char: 'ฅ' },
    { hex: 'A6', dec: 166, char: 'ฆ' },
    { hex: 'A7', dec: 167, char: 'ง' },
    { hex: 'A8', dec: 168, char: 'จ' },
    { hex: 'A9', dec: 169, char: 'ฉ' },
    { hex: 'AA', dec: 170, char: 'ช' },
    { hex: 'AB', dec: 171, char: 'ซ' },
    { hex: 'AC', dec: 172, char: 'ฌ' },
    { hex: 'AD', dec: 173, char: 'ญ' },
    { hex: 'AE', dec: 174, char: 'ฎ' },
    { hex: 'AF', dec: 175, char: 'ฏ' },
    { hex: 'B0', dec: 176, char: 'ฐ' },
    { hex: 'B1', dec: 177, char: 'ฑ' },
    { hex: 'B2', dec: 178, char: 'ฒ' },
    { hex: 'B3', dec: 179, char: 'ณ' },
    { hex: 'B4', dec: 180, char: 'ด' },
    { hex: 'B5', dec: 181, char: 'ต' },
    { hex: 'B6', dec: 182, char: 'ถ' },
    { hex: 'B7', dec: 183, char: 'ท' },
    { hex: 'B8', dec: 184, char: 'ธ' },
    { hex: 'B9', dec: 185, char: 'น' },
    { hex: 'BA', dec: 186, char: 'บ' },
    { hex: 'BB', dec: 187, char: 'ป' },
    { hex: 'BC', dec: 188, char: 'ผ' },
    { hex: 'BD', dec: 189, char: 'ฝ' },
    { hex: 'BE', dec: 190, char: 'พ' },
    { hex: 'BF', dec: 191, char: 'ฟ' },
    { hex: 'C0', dec: 192, char: 'ภ' },
    { hex: 'C1', dec: 193, char: 'ม' },
    { hex: 'C2', dec: 194, char: 'ย' },
    { hex: 'C3', dec: 195, char: 'ร' },
    { hex: 'C4', dec: 196, char: 'ฤ' },
    { hex: 'C5', dec: 197, char: 'ล' },
    { hex: 'C6', dec: 198, char: 'ฦ' },
    { hex: 'C7', dec: 199, char: 'ว' },
    { hex: 'C8', dec: 200, char: 'ศ' },
    { hex: 'C9', dec: 201, char: 'ษ' },
    { hex: 'CA', dec: 202, char: 'ส' },
    { hex: 'CB', dec: 203, char: 'ห' },
    { hex: 'CC', dec: 204, char: 'ฬ' },
    { hex: 'CD', dec: 205, char: 'อ' },
    { hex: 'CE', dec: 206, char: 'ฮ' },
    { hex: 'CF', dec: 207, char: 'ฯ' },
    { hex: 'D0', dec: 208, char: 'ะ' },
    { hex: 'D1', dec: 209, char: 'ั' },
    { hex: 'D2', dec: 210, char: 'า' },
    { hex: 'D3', dec: 211, char: 'ำ' },
    { hex: 'D4', dec: 212, char: 'ิ' },
    { hex: 'D5', dec: 213, char: 'ี' },
    { hex: 'D6', dec: 214, char: 'ึ' },
    { hex: 'D7', dec: 215, char: 'ื' },
    { hex: 'D8', dec: 216, char: 'ุ' },
    { hex: 'D9', dec: 217, char: 'ู' },
    { hex: 'DA', dec: 218, char: 'ฺ' },
    { hex: 'DF', dec: 223, char: '฿' },
    { hex: 'E0', dec: 224, char: 'เ' },
    { hex: 'E1', dec: 225, char: 'แ' },
    { hex: 'E2', dec: 226, char: 'โ' },
    { hex: 'E3', dec: 227, char: 'ใ' },
    { hex: 'E4', dec: 228, char: 'ไ' },
    { hex: 'E5', dec: 229, char: 'ๅ' },
    { hex: 'E6', dec: 230, char: 'ๆ' },
    { hex: 'E7', dec: 231, char: '็' },
    { hex: 'E8', dec: 232, char: '่' },
    { hex: 'E9', dec: 233, char: '้' },
    { hex: 'EA', dec: 234, char: '๊' },
    { hex: 'EB', dec: 235, char: '๋' },
    { hex: 'EC', dec: 236, char: '์' },
    { hex: 'ED', dec: 237, char: 'ํ' },
    { hex: 'EE', dec: 238, char: '๎' },
    { hex: 'EF', dec: 239, char: '๏' },
    { hex: 'F0', dec: 240, char: '๐' },
    { hex: 'F1', dec: 241, char: '๑' },
    { hex: 'F2', dec: 242, char: '๒' },
    { hex: 'F3', dec: 243, char: '๓' },
    { hex: 'F4', dec: 244, char: '๔' },
    { hex: 'F5', dec: 245, char: '๕' },
    { hex: 'F6', dec: 246, char: '๖' },
    { hex: 'F7', dec: 247, char: '๗' },
    { hex: 'F8', dec: 248, char: '๘' },
    { hex: 'F9', dec: 249, char: '๙' },
    { hex: 'FA', dec: 250, char: '๚' },
    { hex: 'FB', dec: 251, char: '๛' },
  ];

  currentDate: any;

  constructor(public services: AppService, private spinner: NgxSpinnerService) {
    this.userID = sessionStorage.getItem('userID');
    this.userName = sessionStorage.getItem('userName');
    this.wardName = sessionStorage.getItem('locationNm');
    this.wardPhone = sessionStorage.getItem('locationPhone');
  }

  ngOnInit(): void {
    this.getErrorType();
    const date = moment();
    this.currentDate = date.format('YYYY-MM-DD');
  }

  // refreshPage() {
  //   location.reload();
  // }

  convertRtfToText(rtfText: string): string {
    const rtfPattern = /\\([a-z0-9]*)\b|\\/g;
    const plainText = rtfText.replace(rtfPattern, '');
    const unwantedText = '{{{{* MS Sans Serif;}Helv;}}';
    const startIndex = plainText.indexOf(unwantedText) + unwantedText.length;
    const endIndex = plainText.lastIndexOf('}');
    const extractedText = plainText.substring(startIndex, endIndex);
    let inputText = extractedText.trim().toUpperCase();
    let symbolIndex = inputText.indexOf("'");
    while (symbolIndex !== -1) {
      const twoChars = inputText.substring(symbolIndex + 1, symbolIndex + 3);
      const convertedValue = parseInt(twoChars, 16);
      // console.log(convertedValue);
      let char = '';
      this.Ascii.forEach((item) => {
        item.dec == convertedValue ? (char = item.char) : '';
      });
      inputText = inputText.replace("'" + twoChars, char);
      symbolIndex = inputText.indexOf("'", symbolIndex + 1);
    }
    return inputText;
  }

  // findRequest = async (e: any) => {
  //   let key = new FormData();
  //   key.append('orderNo', e);
  //   this.services.post('DrugIden/HnToRequest', key).then((value: any) => {
  //     // console.log(value);
  //     if (value.connect) {
  //       if (value.rowCount > 0) {
  //         let arr: Array<any> = [];
  //         arr = value.result;
  //         this.requestDetail(arr[0]);
  //       } else {
  //         this.services.alertTimer(
  //           'warning',
  //           'ไม่พบข้อมูลของใบสั่งยาที่ท่านเลือก',
  //           ''
  //         );
  //       }
  //     } else {
  //       this.services.alert(
  //         'error',
  //         'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
  //         'โปรดติดต่อผู้ดูแลระบบ'
  //       );
  //     }
  //   });
  //   // console.log(data);
  // };

  HnToRequest = async (e: any) => {
    // console.log(e);
    this.spinner.show();
    this.listAllRequest = [];
    this.dataAllRequest = null;
    let key = new FormData();
    key.append('hn', String(e.padStart(7, ' ')));
    // key.append('hn', e);
    this.services.post('DrugIden/HnToRequest', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listAllRequest = value.result;
          // console.log(this.listAllRequest);
          this.listAllRequest.forEach((el) => {
            el.reqDateTh = this.formatValToDateTh(el.reqDate);
            let key = new FormData();
            key.append('reqNo', el.reqNo);
            this.services
              .post('DrugIden/checkReqHit', key)
              .then((value: any) => {
                // console.log(value);
                if (value.connect) {
                  if (value.rowCount > 0) {
                    el.status = value.result[0]['reqStatus'];
                    el.editMaker = value.result[0]['editMaker'];
                    el.comfirmMaker = value.result[0]['comfirmMaker'];
                  }
                } else {
                  this.services.alert(
                    'error',
                    'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                    'โปรดติดต่อผู้ดูแลระบบ'
                  );
                }
              });
          });
          this.dataAllRequest = new MatTableDataSource(this.listAllRequest);
          this.dataAllRequest.sort = this.sortAllRequest;
          this.dataAllRequest.paginator = this.paginAllRequest;
          this.spinner.hide();
        } else {
          this.services.alertTimer(
            'warning',
            'ไม่พบข้อมูลของ HN ที่ท่านเลือก',
            ''
          );
          this.spinner.hide();
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

  requestDetail = async (e: any) => {
    // console.log(e);
    this.orderRequest = e;
    this.arrMedError = [];

    this.ED = 0;
    this.NED = 0;
    this.MINE = 0;
    this.total = 0;
    this.patientAge = this.calculateAge(e.birthDay);
    this.reqDateTh = this.formatDateEnToDateTh(this.currentDate);
    if (this.orderRequest.status === 'wait') {
      this.reqStatus = 'รอตรวจสอบ';
    } else if (this.orderRequest.status === 'edit') {
      this.reqStatus = 'ส่งแก้ไข';
    } else {
      this.reqStatus = 'เสร็จสิ้น';
    }

    await this.getOrderDetail(e);
    await this.getLab(e);
    await this.getAllergy(e);
    await this.getRequestMSG(e);
    await this.getIntx(e);
    // await this.getDrugOff(e);

    this.getPharmacistNote();
  };

  getOrderDetail = async (e: any) => {
    // console.log(e.status);
    this.spinner.show();
    this.showDetail = true;
    this.listOrderDetail = [];
    this.drugOff = [];
    let key = new FormData();
    key.append('hn', e.hn);
    key.append('registNo', e.registNo);
    key.append('reqTyp2', e.reqType2);
    key.append('orderNo', e.reqNo);

    // key.forEach((value, key) => {
    //   console.log(key + ' : ' + value);
    // });
    let path = '';
    e.reqType === 'CONTINUE' ? (path = 'con') : (path = 'one');
    this.services.post('DrugIden/req' + path, key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          let listReq: Array<any> = [];
          listReq = value.result;
          // console.log(listReq);
          let keyReq: any = [];
          listReq.forEach((rn) => {
            keyReq += "'" + rn.reqNo + "',";
          });
          // console.log(keyReq.substring(0, keyReq.length - 1));
          let data = new FormData();
          data.append('listReq', keyReq.substring(0, keyReq.length - 1));
          // data.forEach((value, key) => {
          //   console.log(key + ' : ' + value);
          // });
          this.services
            .post('DrugIden/RequestDetail', data)
            .then((value: any) => {
              // console.log(value);
              if (value.connect) {
                if (value.rowCount > 0) {
                  let item: Array<any> = [];
                  if (e.reqType2 === 'S') {
                    item = value.result;
                    // console.log(this.formatDateEnToVal(this.currentDate));
                    // console.log(item);
                    for (const i of item) {
                      if (i.endDate !== null) {
                        // console.log(this.formatDateEnToVal(i.endDate));
                        if (
                          this.formatDateEnToVal(i.endDate) >
                          this.formatDateEnToVal(this.currentDate)
                        ) {
                          this.listOrderDetail.push(i);
                        } else if (
                          this.formatDateEnToVal(i.endDate) ===
                          this.formatDateEnToVal(this.currentDate)
                        ) {
                          this.drugOff += i.drugName + ' / ';
                        }
                      } else {
                        this.listOrderDetail.push(i);
                      }
                    }
                  } else {
                    this.listOrderDetail = value.result;
                  }
                  this.listDrugPN = [];
                  // console.log(this.listOrderDetail);
                  this.numOrderCheck = 0;
                  this.listOrderDetail.forEach((el, i) => {
                    el.reqNo === this.orderRequest.reqNo
                      ? this.numOrderCheck++
                      : '';
                    let arr = {
                      drugCode: el.drugCode,
                      drugName: el.drugName,
                      checkBox: 0,
                    };
                    this.listDrugPN.push(arr);
                    el.row_number = i + 1;
                    el.lamedName.length > 0 &&
                    el.reqNo !== this.orderRequest.reqNo
                      ? ((el.qtyReq = 0), (el.u_price = 0))
                      : (el.qtyReq = Math.ceil(el.qtyReq));
                    el.startIssDate !== null
                      ? (el.startIssDate = this.formatDateEnToDateTh(
                          el.startIssDate
                        ))
                      : '';
                    el.lastIssDate !== null
                      ? (el.lastIssDate = this.formatDateEnToDateTh(
                          el.lastIssDate
                        ))
                      : '';
                    el.nextIssDate !== null
                      ? (el.nextIssDate = this.formatDateEnToDateTh(
                          el.nextIssDate
                        ))
                      : '';
                    el.endDate !== null
                      ? (el.endDate = this.formatDateEnToDateTh(el.endDate))
                      : '';

                    this.services.getImg(el.drugCode).then((value: any) => {
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
                          el.img = this.services.rootPath + imgPath;
                        }
                      } else {
                        this.services.alert(
                          'error',
                          'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                          'โปรดติดต่อผู้ดูแลระบบ'
                        );
                      }
                    });
                    let detail = new FormData();
                    detail.append('reqNo', this.orderRequest.reqNo);
                    detail.append('wardcode', e.wardcode);
                    detail.append('drugCode', el.drugCode);
                    detail.append('hn', e.hn);
                    detail.append(
                      'thDate',
                      this.formatDateEnToVal(this.currentDate)
                    );
                    // detail.forEach((value, key) => {
                    //   console.log(key + ' : ' + value);
                    // });
                    this.services
                      .post('DrugIden/drugLab', detail)
                      .then((value: any) => {
                        // console.log(value);
                        if (value.connect) {
                          if (value.rowCount > 0) {
                            el.lab = value.result;
                          }
                        } else {
                          this.services.alert(
                            'error',
                            'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                            'โปรดติดต่อผู้ดูแลระบบ'
                          );
                        }
                      });
                    if (this.orderRequest.reqNo === el.reqNo) {
                      this.services
                        .post('DrugIden/checkMedStock', detail)
                        .then((value: any) => {
                          // console.log(value);
                          if (value.connect) {
                            if (value.rowCount > 0) {
                              el.medFloorStock = 'Y';
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
                    if (e.status != 'wait') {
                      this.services
                        .post('DrugIden/checkMedReqH', detail)
                        .then((value: any) => {
                          // console.log(value);
                          if (value.connect) {
                            if (value.rowCount > 0) {
                              el.CF = value.result[0]['drugStatus'];
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
                    this.ED += parseFloat(el.u_price);
                  });
                  this.total += this.ED;
                  this.dataOrderDetail = new MatTableDataSource(
                    this.listOrderDetail
                  );
                  this.dataOrderDetail.sort = this.sortOrderDetail;
                  this.dataOrderDetail.paginator = this.paginOrderDetail;
                  // console.log(this.listOrderDetail);
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

  formatValToDateTh(e: any) {
    const y = e.substring(0, 4);
    const m = e.substring(4, 6);
    const d = e.substring(6, 8);
    return d + '/' + m + '/' + y;
  }

  formatValToDateEn(e: any) {
    // console.log(e);
    const parsedDate = moment(e, 'YYYYMMDD');
    const subtractedDate = parsedDate.subtract(543, 'years');
    return subtractedDate.format('YYYY-MM-DD');
  }

  formatDateEnToVal(e: any) {
    // console.log(e);
    const dateParts = e.replaceAll('-', '');
    const y = parseInt(dateParts.substring(0, 4)) + 543;
    const m = dateParts.substring(4, 6);
    const d = dateParts.substring(6, 8);
    return y.toString() + m + d;
  }

  formatDateEnToDateTh(e: any) {
    // console.log(e);
    const dateParts = e.replaceAll('-', '');
    const y = parseInt(dateParts.substring(0, 4)) + 543;
    const m = dateParts.substring(4, 6);
    const d = dateParts.substring(6, 8);
    return d + '/' + m + '/' + y;
  }

  getLab = async (e: any) => {
    let key = new FormData();
    key.append('hn', e.hn);
    key.append('thDate', e.reqDate);
    this.services.post('DrugIden/RequestLab', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.labDetail = value.result;
          // console.log(this.labDetail);d
          this.Scr =
            this.labDetail[0]['real_res'] +
            ' mg/dL (' +
            this.labDetail[0]['reqDate'] +
            ')';
          this.eGFR =
            this.labDetail[1]['real_res'] +
            ' ml/min/1.73m2 (' +
            this.labDetail[1]['reqDate'] +
            ')';
          this.K =
            this.labDetail[2]['real_res'] +
            ' mmol/L (' +
            this.labDetail[2]['reqDate'] +
            ')';
        } else {
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

  // getDrugOff = async (e: any) => {

  //   this.drugOff = [];
  //   let key = new FormData();
  //   key.append('reqNo', e.reqNo);
  //   key.append('reqDate', this.formatValToDateEn(e.thDate));
  //   this.services.post('DrugIden/orderDrugOff', key).then((value: any) => {
  //     // console.log(value);
  //     if (value.connect) {
  //       if (value.rowCount > 0) {
  //         let arr: Array<any> = [];
  //         arr = value.result;
  //         arr.forEach((el) => {
  //           // console.log(el.drugName);
  //           this.drugOff += el.drugName + ' / ';
  //         });
  //       }
  //     } else {
  //       this.services.alert(
  //         'error',
  //         'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
  //         'โปรดติดต่อผู้ดูแลระบบ'
  //       );
  //     }

  //   });
  // };

  getRequestMSG = async (e: any) => {
    // console.log(e)

    this.patientMSG = [];
    let key = new FormData();
    key.append('hn', e.hn);
    key.append('curDate', this.formatDateEnToVal(this.currentDate));
    this.services.post('DrugIden/RequestMSG', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          let arr: Array<any> = [];
          arr = value.result;
          arr.forEach((a) => {
            // console.log(a.MSG_TEXT);
            // console.log(this.convertRtfToText(a.MSG_TEXT));
            this.patientMSG += this.convertRtfToText(a.MSG_TEXT);
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

  getIntx = async (e: any) => {
    this.patientIntx = [];
    let key = new FormData();
    key.append('hn', e.hn);
    key.append('registNo', e.registNo);
    this.services.post('DrugIden/RequestIntx', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.patientIntx = value.result;
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

  viewLab = async (e: any) => {
    // console.log(e.lab.length);
    let arr: Array<any> = [];
    let content: any = '';
    if (e.lab) {
      arr = e.lab;
      arr.forEach((el) => {
        // console.log(arr.result_name);
        content +=
          el.result_name + '=' + el.real_res + ' (' + el.res_date + ') ';
      });
    }
    Swal.fire({
      html:
        `<div class="left">` + e.drugName + `<br><b>` + content + `</b></div>`,
      showConfirmButton: false,
    });
  };

  viewLamed = async (e: any) => {
    // console.log(e);
    let endDate;
    e.endDate === null ? (endDate = '') : (endDate = e.endDate);
    let content =
      `<div class="left">` +
      e.lamed1 +
      ' ' +
      `<b>` +
      e.lamed2 +
      ' ' +
      e.lamed3 +
      ' ' +
      e.lamed4 +
      `</b>` +
      e.lamed5 +
      `<br> Lastlss. ` +
      e.lastIssDate +
      ' Nextlss. ' +
      e.nextIssDate;
    if (e.endDate) {
      content += `<br> วันที่หยุด` + e.endDate;
    }
    content += ' ' + e.lamedName + `</div>`;
    Swal.fire({
      html: content,
      showConfirmButton: false,
    });
  };

  viewImg = async (e: any) => {
    Swal.fire({
      title: e.drugName,
      imageUrl: e.img,
      imageAlt: 'Popup Image',
      showCloseButton: true,
      showConfirmButton: false,
      // width: `800px`,
    });
  };

  clear() {
    this.listAllRequest = [];
    this.dataAllRequest = null;
  }

  back = async () => {
    this.showDetail = false;
    this.listOrderDetail = [];
    this.dataOrderDetail = null;
    this.checkCount = 0;
    this.orderRequest = null;
    this.valueHN = '';
    this.valueReq = '';
    this.arrMedError = [];
  };

  calculateAge(thaiDate: string): number {
    // console.log(thaiDate);
    const thaiYear = parseInt(thaiDate.substring(0, 4), 10);
    const thaiMonth = parseInt(thaiDate.substring(4, 6), 10);
    const thaiDay = parseInt(thaiDate.substring(6, 8), 10);

    const currentDate = new Date();
    const currentYearBE = currentDate.getFullYear() + 543;
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    let age = currentYearBE - thaiYear;

    if (
      currentMonth < thaiMonth ||
      (currentMonth === thaiMonth && currentDay < thaiDay)
    ) {
      age--;
    }
    return age;
  }

  drugTrue(e: any) {
    // console.log(e)
    if (this.listOrderDetail[e]['CF'] !== 1) {
      this.listOrderDetail[e]['CF'] = 1;
      // console.log(this.listOrderDetail[e]['CF'])
      this.dataOrderDetail = new MatTableDataSource(this.listOrderDetail);
      this.dataOrderDetail.sort = this.sortOrderDetail;
      this.dataOrderDetail.paginator = this.paginOrderDetail;
    }
  }

  checkTureAll() {
    this.arrMedError = [];
    this.checkAll = ~this.checkAll + 2;
    this.orderRequest.status === 'edit' ? (this.checkAll = 1) : '';

    this.listOrderDetail.forEach((e) => {
      e['CF'] = this.checkAll;
    });
    this.dataOrderDetail = new MatTableDataSource(this.listOrderDetail);
    this.dataOrderDetail.sort = this.sortOrderDetail;
    this.dataOrderDetail.paginator = this.paginOrderDetail;
  }

  drugFalse(e: any) {
    this.formPE = {
      type: '',
      oper: '',
      seve: '',
      name: '',
      use: '',
      qty: '',
    };
    this.formPD = {
      type: '',
      type_note: '',
      pers: '',
      cond: '',
      cond_note: '',
      proc: '',
      proc_note: '',
      prod: '',
      prod_note: '',
    };
    this.setMedError = [];
    this.setMedError = e;
    this.setPEtype = null;
    this.setPEoper = null;
    this.setPEseve = null;
    this.setPDpers = null;
    this.setPDcond = null;
    this.setPDproc = null;
    this.setPDprod = null;
    _window.$(`#medErrorModal`).modal('show');
  }

  getPharmacistNote() {
    this.formPN = {
      drug: '',
      prescription: '',
      docc: '',
      previous: '',
    };
    this.getPN_prescription();
    this.getPN_docc();
    this.getPN_previous();
  }

  getPN_prescription = async () => {
    this.PN_prescription = [];
    this.services.get('DrugIden/PN_prescription').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PN_prescription = value.result;
          // console.log(this.PN_prescription);
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

  getPN_docc = async () => {
    this.PN_docc = [];
    this.services.get('DrugIden/PN_docc').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PN_docc = value.result;
          // console.log(this.PN_docc);
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

  getPN_previous = async () => {
    this.PN_previous = [];
    this.services.get('DrugIden/PN_previous').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PN_previous = value.result;
          // console.log(this.PN_previous);
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

  checkDrug = async (e: any) => {
    // console.log(e);
    // this.listDrugPN.forEach((i) => {
    //   if (i.drugCode === e.drugCode) {
    //     i.checkBox = i.checkBox ^ 1;
    //   }
    // });
    // console.log(this.listDrugPN)
    this.formPN.drug = e.value.drugCode;
  };

  checkPN = async (e: any, type: any) => {
    // console.log(e);
    let checkBox = e.checkbox ^ 1;
    let note: any = null;
    if (e.note !== null) {
      if (checkBox === 1) {
        _window.$(`#pharmacistNote`).modal('hide');
        let name = e.name1 + ' *กรุณากรอกข้อมูล* ';
        e.name2 ? (name += e.name2) : '';
        const { value: val } = await Swal.fire({
          input: 'text',
          title: '',
          text: name,
          inputLabel: '',
          inputPlaceholder: '*กรุณากรอกข้อมูล*',
          confirmButtonText: 'ยืนยัน',
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          html: '',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value) {
                resolve('');

                _window.$(`#pharmacistNote`).modal('show');
              } else {
                resolve('กรุณากรอกข้อมูลให้ครบถ้วน');
              }
            });
          },
        });
        note = val;
      } else {
        note = '';
      }
    }

    if (type === 0) {
      this.PN_prescription.forEach(async (i) => {
        if (i.code === e.code) {
          i.checkbox = checkBox;
          i.note = note;
        }
      });
    } else if (type === 1) {
      this.PN_docc.forEach(async (i) => {
        if (i.code === e.code) {
          i.checkbox = checkBox;
          i.note = note;
        }
      });
    } else {
      this.PN_previous.forEach(async (i) => {
        if (i.code === e.code) {
          i.checkbox = checkBox;
          i.note = note;
        }
      });
    }

    // console.log(this.PN_prescription);
  };

  submitPN() {
    // console.log(this.PN_prescription);
    this.formPN.prescription = '';
    let drugNote = 'เนื่องจากยา <u>' + this.formPN.drug + '</u><br><br>';
    let x_code = '';
    let x_head = '';
    let x_body = '';
    this.PN_prescription.forEach((el) => {
      if (el.checkbox === 1) {
        x_head = '<b><u>คำสั่งใช้ยา</u></b><br>';
        x_code = el.code + ':' + el.note + ',';
        x_body += ' - ' + el.name1;
        el.note !== null ? (x_body += ' <u>' + el.note + '</u> ') : '';
        el.name2 !== null ? (x_body += el.name2) : '';
        x_body += '<br>';
        this.formPN.prescription += x_code;
      }
    });
    this.formPN.docc = '';
    let y_code = '';
    let y_head = '';
    let y_body = '';
    this.PN_docc.forEach((el) => {
      if (el.checkbox === 1) {
        y_head = '<b><u>เอกสารประกอบการสั่งใช้ยา</u></b><br>';
        y_code = el.code + ':' + el.note + ',';
        y_body += ' - ' + el.name1;
        el.note !== null ? (y_body += ' <u>' + el.note + '</u> ') : '';
        el.name2 !== null ? (y_body += el.name2) : '';
        y_body += '<br>';
        this.formPN.docc += y_code;
      }
    });
    this.formPN.previous = '';
    let z_code = '';
    let z_head = '';
    let z_body = '';
    this.PN_previous.forEach((el) => {
      if (el.checkbox === 1) {
        z_head = '<b><u>ยาเดิมผู้ป่วย</u></b><br>';
        z_code = el.code + ':' + el.note + ',';
        z_body += ' - ' + el.name1;
        el.note !== null ? (z_body += ' <u>' + el.note + '</u> ') : '';
        el.name2 !== null ? (z_body += el.name2) : '';
        z_body += '<br>';
        this.formPN.previous += z_code;
      }
    });
    // console.log(this.formPN);

    let key = new FormData();
    key.append('reqNo', this.orderRequest.reqNo);
    key.append('drugCode', this.formPN.drug);
    key.append('prescription', this.formPN.prescription);
    key.append('docc', this.formPN.docc);
    key.append('previous', this.formPN.previous);
    key.append('marker', this.userID);
    // key.forEach((value, key) => {
    //   console.log(key + ' : ' + value);
    // });
    this.services.post('DrugIden/insertPN', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.getPharmacistNote();
          _window.$(`#pharmacistNote`).modal('hide');
          this.services.alertTimer('success', 'บันทึกข้อมูลสำเร็จ', '');
          this.formPN = {
            drug: '',
            prescription: '',
            docc: '',
            previous: '',
          };
        }
      } else {
        this.services.alert(
          'error',
          'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
          'โปรดติดต่อผู้ดูแลระบบ'
        );
      }
    });
    const headPrint = document.getElementById('headPrint');
    const footPrint = document.getElementById('footPrint');
    const print = window.open('', '', 'height=600, width=800');
    if (headPrint && footPrint) {
      const headContert = headPrint.innerHTML;
      const footContent = footPrint.innerHTML;
      if (print) {
        print.document.write(
          '<html><head><title>Pharmacist Note</title></head><body>'
        );
        print.document.write(
          '<h2 style="text-align: center;">Pharmacist Note</h2>'
        );
        print.document.write(headContert);
        print.document.write(drugNote);
        if (x_head) {
          print.document.write(x_head);
          print.document.write(x_body);
          print.document.write('<br>');
        }
        if (y_head) {
          print.document.write(y_head);
          print.document.write(y_body);
          print.document.write('<br>');
        }
        if (z_head) {
          print.document.write(z_head);
          print.document.write(z_body);
          print.document.write('<br>');
        }
        print.document.write(footContent);
        print.document.write('</body></html>');
        print.document.close();
        print.print();
      }
    }
  }

  getErrorType = async () => {
    await this.getPE_type();
    await this.getPE_oper();
    await this.getPE_seve();
    await this.getPD_type();
    await this.getPD_pers();
    await this.getPD_cond();
    await this.getPD_proc();
    await this.getPD_prod();
  };

  getPE_type = async () => {
    this.PE_type = [];
    this.services.get('DrugIden/PE_type').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PE_type = value.result;
          // console.log(this.PE_type);
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

  getPE_oper = async () => {
    this.PE_oper = [];
    this.services.get('DrugIden/PE_operator').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PE_oper = value.result;
          // console.log(this.PE_oper);
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

  getPE_seve = async () => {
    this.PE_seve = [];
    this.services.get('DrugIden/PE_severity').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PE_seve = value.result;
          // console.log(this.PE_seve);
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

  getPD_type = async () => {
    this.PD_type = [];
    this.services.get('DrugIden/PD_type').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PD_type = value.result;
          // console.log(this.PD_pers);
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

  getPD_pers = async () => {
    this.PD_pers = [];
    this.services.get('DrugIden/PD_personal').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PD_pers = value.result;
          // console.log(this.PD_pers);
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

  getPD_cond = async () => {
    this.PD_cond = [];
    this.services.get('DrugIden/PD_condition').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PD_cond = value.result;
          // console.log(this.PD_cond);
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

  getPD_proc = async () => {
    this.PD_proc = [];
    this.services.get('DrugIden/PD_process').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PD_proc = value.result;
          // console.log(this.PD_proc);
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

  getPD_prod = async () => {
    this.PD_prod = [];
    this.services.get('DrugIden/PD_product').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.PD_prod = value.result;
          // console.log(this.PD_prod);
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

  selectPEtype(e: any) {
    this.formPE.type = e.value;
  }
  selectPEoper(e: any) {
    this.formPE.oper = e.value;
  }
  selectPEseve(e: any) {
    this.formPE.seve = e.value;
  }
  selectPDtype(e: any) {
    this.formPD.type = e.value;
  }
  selectPDpers(e: any) {
    this.formPD.pers = e.value;
  }
  selectPDcond(e: any) {
    this.formPD.cond = e.value;
  }
  selectPDproc(e: any) {
    this.formPD.proc = e.value;
  }
  selectPDprod(e: any) {
    this.formPD.prod = e.value;
  }

  errorSubmit() {
    // console.log(this.setMedError);
    // console.log(this.formPE);
    // console.log(this.formPD);
    let json = {
      reqNo: this.orderRequest.reqNo,
      drugCode: this.setMedError.drugCode,
      drugName: this.setMedError.drugName,
      drugUse:
        this.setMedError.lamed1 +
        ' ' +
        this.setMedError.lamed2 +
        ' ' +
        this.setMedError.lamed3 +
        ' ' +
        this.setMedError.lamed4 +
        ' ' +
        this.setMedError.lamed5,
      drugQty: this.setMedError.qtyReq,
      pe_type: this.formPE.type,
      pe_oper: this.formPE.oper,
      pe_seve: this.formPE.seve,
      pe_name: this.formPE.name,
      pe_use: this.formPE.use,
      pe_qty: this.formPE.qty,
      pd_type: this.formPD.type,
      pd_type_note: this.formPD.type_note,
      pd_pers: this.formPD.pers,
      pd_cond: this.formPD.cond,
      pd_cond_note: this.formPD.cond_note,
      pd_proc: this.formPD.proc,
      pd_proc_note: this.formPD.proc_note,
      pd_prod: this.formPD.prod,
      pd_prod_note: this.formPD.prod_note,
      maker: this.userID,
    };
    this.arrMedError.push(json);
    this.listOrderDetail[this.setMedError.row_number - 1]['CF'] = 2;
    _window.$(`#medErrorModal`).modal('hide');
  }

  preCheck() {
    let numCheck = 0;
    this.listOrderDetail.forEach((el) => {
      if (el.CF === 1 || el.CF === 2) {
        numCheck++;
      }
    });
    // console.log(numCheck)
    if (numCheck >= this.numOrderCheck) {
      return true;
    } else {
      this.services.alert(
        'error',
        'ตรวจสอบรายการไม่ครบ',
        'กรุณาตรวจสอบรายการให้ครบ'
      );
      return false;
    }
  }

  submitError() {
    if (this.preCheck()) {
      this.services
        .confirm('warning', 'ส่งแก้ไข', 'ยืนยันการบันทึกข้อมูล')
        .then((val: any) => {
          if (val) {
            // console.log(this.arrMedError);
            // console.log(this.listOrderDetail);
            this.listOrderDetail.forEach((el) => {
              let item = new FormData();
              item.append('reqNo', this.orderRequest.reqNo);
              item.append('drugCode', el.drugCode);
              item.append('drugStatus', el.CF);
              if (el.reqNo === this.orderRequest.reqNo) {
                this.services
                  .post('DrugIden/insertReqDetial', item)
                  .then((value: any) => {
                    // console.log(value);
                    if (value.connect) {
                    } else {
                      this.services.alert(
                        'error',
                        'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                        'โปรดติดต่อผู้ดูแลระบบ'
                      );
                    }
                  });
              }
            });

            if (this.arrMedError.length > 0) {
              this.arrMedError.forEach((el) => {
                let key = new FormData();
                key.append('reqNo', el.reqNo);
                key.append('hn', this.orderRequest.hn);
                key.append('maker', this.userID);
                key.append('drugCode', el.drugCode);

                key.append('drugName', el.drugName);
                key.append('drugUse', el.drugUse);
                key.append('drugQty', el.drugQty);
                //PE
                key.append('pe_type', el.pe_type);
                key.append('pe_oper', el.pe_oper);
                key.append('pe_seve', el.pe_seve);
                key.append('pe_name', el.pe_name);
                key.append('pe_use', el.pe_use);
                key.append('pe_qty', el.pe_qty);
                //PD
                key.append('pd_pers', el.pd_pers);
                key.append('pd_cond', el.pd_cond);
                key.append('pd_cond_note', el.pd_cond_note);
                key.append('pd_proc', el.pd_proc);
                key.append('pd_proc_note', el.pd_proc_note);
                key.append('pd_prod', el.pd_prod);
                key.append('pd_prod_note', el.pd_prod_note);
                // key.forEach((value, key) => {
                //   console.log(key + ' : ' + value);
                // });
                this.services
                  .post('DrugIden/insertReqEdit', key)
                  .then((value: any) => {
                    // console.log(value);
                    if (value.connect) {
                      if (value.rowCount > 0) {
                        this.services.alertTimer(
                          'success',
                          'บันทึกข้อมูลสำเร็จ',
                          ''
                        );
                        this.HnToRequest(this.orderRequest.hn);
                        this.back();
                      }
                    } else {
                      this.services.alert(
                        'error',
                        'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                        'โปรดติดต่อผู้ดูแลระบบ'
                      );
                    }
                  });

                this.services
                  .post('DrugIden/insertPEerror', key)
                  .then((value: any) => {
                    // console.log(value);
                    if (value.connect) {
                    } else {
                      this.services.alert(
                        'error',
                        'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                        'โปรดติดต่อผู้ดูแลระบบ'
                      );
                    }
                  });
                this.services
                  .post('DrugIden/insertPDerror', key)
                  .then((value: any) => {
                    // console.log(value);
                    if (value.connect) {
                    } else {
                      this.services.alert(
                        'error',
                        'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                        'โปรดติดต่อผู้ดูแลระบบ'
                      );
                    }
                  });
              });
            }
          }
        });
    }
  }

  submitComplete() {
    if (this.preCheck()) {
      // console.log(this.listOrderDetail);
      this.services
        .confirm('warning', 'ยืนยันการบันทึกข้อมูล', '')
        .then((val: any) => {
          if (val) {
            this.insertReq();
          }
        });
    }
  }

  submitAgian(){
    this.insertReq();
  }

  insertReq() {
    let numCheck: boolean = false;
    for (const el of this.listOrderDetail) {
      if (el.CF == 0) {
        numCheck = true;
      }
    }
    if (numCheck) {
      this.services.alert(
        'warning',
        'ตรวจสอบรายการยาไม่ครบ',
        'โปรดตรวจสอบรายการยาให้ครบถ้วน'
      );
    } else {
      let req = new FormData();
      req.append('reqNo', this.orderRequest.reqNo);
      req.append('hn', this.orderRequest.hn);
      req.append('maker', this.userID);
      if (this.orderRequest.status === 'wait') {
        this.services.post('DrugIden/insertReqDone', req).then((value: any) => {
          // console.log(value);
          if (value.connect) {
            if (value.rowCount > 0) {
              this.services.alertTimer('success', 'บันทึกข้อมูลสำเร็จ', '');
              this.HnToRequest(this.orderRequest.hn);
              this.back();
            }
          } else {
            this.services.alert(
              'error',
              'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
              'โปรดติดต่อผู้ดูแลระบบ'
            );
          }
        });
      } else {
        this.services.post('DrugIden/updateReqDone', req).then((value: any) => {
          // console.log(value);
          if (value.connect) {
            if (value.rowCount > 0) {
              this.services.alertTimer('success', 'บันทึกข้อมูลสำเร็จ', '');
              this.HnToRequest(this.orderRequest.hn);
              this.back();
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
      let printStatus: any;
      this.orderRequest.status === 'done'
        ? (printStatus = 3)
        : (printStatus = 0);
      this.listOrderDetail.forEach((el) => {
        let key = new FormData();
        key.append('reqNo', this.orderRequest.reqNo);
        key.append('maker', this.userID);
        key.append('wardCode', this.orderRequest.wardCode);
        key.append('drugStatus', el.CF);
        key.append('drugCode', el.drugCode);
        key.append('runNo', el.runNo);
        key.append('lastRunNo', this.orderRequest.lastRunNo);
        key.append(
          'preDate',
          this.formatValToDateEn(this.formatDateEnToVal(this.currentDate))
        );
        key.append('hn', this.orderRequest.hn);
        key.append('an', this.orderRequest.an);
        key.append(
          'name',
          this.orderRequest.titlename +
            ' ' +
            this.orderRequest.firstname +
            ' ' +
            this.orderRequest.lastname
        );
        key.append(
          'Birthday',
          this.formatValToDateEn(this.orderRequest.birthDay)
        );
        this.orderRequest.sex == 'ช'
          ? key.append('Sex', 'M')
          : key.append('Sex', 'F');
        key.append('drugName', el.drugName);
        key.append('qtyReq', el.qtyReq);
        key.append('unit', el.unit);
        key.append('qtyDay', el.lamed2);
        key.append(
          'Freq_Desc',
          el.lamed1 +
            ' ' +
            el.lamed2 +
            ' ' +
            el.lamed3 +
            ' ' +
            el.lamed4 +
            ' ' +
            el.lamed5
        );
        key.append('wardcode', this.orderRequest.wardcode);
        key.append('ward_name', this.orderRequest.ward_name);
        key.append('bedcode', this.orderRequest.bedcode);
        key.append('Freetext1', el.lamed1 + ' ' + el.lamed2 + ' ' + el.lamed3);
        key.append('Freetext2', el.lamed4);
        key.append('Freetext4', el.lamed5);
        key.append('printStatus', printStatus);
        // key.forEach((value, key) => {
        //   console.log(key + ' : ' + value);
        // });
        if (el.reqNo === this.orderRequest.reqNo) {
          if (this.orderRequest.status === 'wait') {
            this.services
              .post('DrugIden/insertReqDetial', key)
              .then((value: any) => {
                // console.log(value);
                if (value.connect) {
                } else {
                  this.services.alert(
                    'error',
                    'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                    'โปรดติดต่อผู้ดูแลระบบ'
                  );
                }
              });
          } else {
            this.services
              .post('DrugIden/updateReqDetial', key)
              .then((value: any) => {
                // console.log(value);
                if (value.connect) {
                } else {
                  this.services.alert(
                    'error',
                    'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
                    'โปรดติดต่อผู้ดูแลระบบ'
                  );
                }
              });
          }        
          if (
            this.orderRequest.reqType !== 'HOME MED' &&
            parseInt(el.CF) === 1 &&
            el.medFloorStock === 'Y' &&
            parseInt(el.qtyReq) > 0
          ) {
            this.services
              .post('DrugIden/medFloorStock', key)
              .then((value: any) => {
                // console.log(value);
                if (value.connect) {
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
      });
    }
  }
}
