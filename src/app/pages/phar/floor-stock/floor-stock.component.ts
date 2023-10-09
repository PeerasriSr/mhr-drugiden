import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import * as QRCodeGenerator from 'qrcode-generator';

const _window: any = window;

@Component({
  selector: 'app-floor-stock',
  templateUrl: './floor-stock.component.html',
  styleUrls: ['./floor-stock.component.scss'],
})
export class FloorStockComponent implements OnInit {
  @HostListener('window:afterprint', ['$event'])
  onAfterPrint(event: Event) {
    //  console.log("Print Or Cancel Done")
  }

  userID: any;
  positionid: any;
  show = 1;
  printNow = 1;
  listMaBox: Array<any> = [];
  shelfname: any;

  listAlertRefill: Array<any> = [];
  dataAlertRefill: any;
  @ViewChild('sortAlertRefill') sortAlertRefill!: MatSort;
  @ViewChild('paginAlertRefillt') paginAlertRefill!: MatPaginator;
  displayAlertRefill: string[] = [
    'shelfname',
    'DrugNm',
    'Max',
    'Min',
    'SumLotQty',
    'Refill',
  ];

  showDispenStockt: boolean = false;
  listDispenStockt: Array<any> = [];
  dataDispenStockt: any;
  @ViewChild('sortDispenStockt') sortDispenStockt!: MatSort;
  @ViewChild('paginDispenStockt') paginDispenStockt!: MatPaginator;
  displayDispenStockt: string[] = [
    'binID',
    'DrugNm',
    // 'LotNo',
    'Exp',
    // 'In_Qty',
    'SumLotQty',
    'Max',
    'Min',
    'Refill',
    // 'addRefill',
  ];

  ListRefill: Array<any> = [];
  dataRefill: any;
  @ViewChild('sortRefill') sortRefill!: MatSort;
  @ViewChild('paginRefill') paginRefill!: MatPaginator;
  displayRefill: string[] = [
    // 'rowNum',
    'qrCode',
    'DrugNm',
    'Lotno',
    'Exp',
    'Refill',
    // 'del',
  ];
  fromRefill = {
    rowNum: 0,
    binID: '',
    DrugCd: '',
    DrugNm: '',
    Refill: '',
    qrCode: '',
    Lotno: '',
    Exp: '',
  };

  RefillH: Array<any> = [];

  constructor(public services: AppService, private spinner: NgxSpinnerService) {
    this.userID = sessionStorage.getItem('userID');
  }

  ngOnInit(): void {
    this.alertRefillMedDis();
    this.get_msBox();
  }

  alertRefillMedDis = async () => {
    this.listAlertRefill = [];
    this.services.get('DrugIden/alertRefillMedDis').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listAlertRefill = value.result;
          // console.log(this.listAlertRefill);
          _window.$(`#arlertRefill`).modal('show');
          this.dataAlertRefill = new MatTableDataSource(this.listAlertRefill);
          this.dataAlertRefill.sort = this.sortAlertRefill;
          this.dataAlertRefill.paginator = this.paginAlertRefill;
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

  get_msBox = async () => {
    this.listMaBox = [];
    this.services.get('DrugIden/listMsBox').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.listMaBox = value.result;
          // console.log(this.listMaBox);
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

  selectMsBox(e: any) {
    // console.log(e);
    this.shelfname = e.value.shelfname;
    this.listDispenStockt = [];
    this.dataDispenStockt = [];
    this.ListRefill = [];
    this.spinner.show();
    this.showDispenStockt = false;
    this.spinner.show();
    this.positionid = e.value.positionid;
    let key = new FormData();
    key.append('positionid', this.positionid);
    this.services.post('DrugIden/medDispenStock', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          let arr: Array<any> = [];
          arr = value.result;
          // this.listDispenStockt.push(arr[0]);
          arr.forEach((arr) => {
            let LotNo = [];
            LotNo.push(arr.LotNo);
            arr.LotNo = LotNo;
            let Exp = [];
            Exp.push(arr.Exp);
            arr.Exp = Exp;
            let In_Qty = [];
            In_Qty.push(arr.In_Qty);
            arr.In_Qty = In_Qty;

            let x = null;
            if (this.listDispenStockt) {
              this.listDispenStockt.forEach((list, i) => {
                if (list.binID === arr.binID) {
                  x = i;
                  // console.log(i);
                }
              });
            }
            if (x !== null) {
              // LotNo.push(arr.LotNo)
              let LotNo = [];
              LotNo.push(this.listDispenStockt[x]['LotNo']);
              LotNo.push(arr.LotNo);
              this.listDispenStockt[x]['LotNo'] = LotNo;
              let Exp = [];
              Exp.push(this.listDispenStockt[x]['Exp']);
              Exp.push(arr.Exp);
              this.listDispenStockt[x]['Exp'] = Exp;
              let In_Qty = [];
              In_Qty.push(this.listDispenStockt[x]['In_Qty']);
              In_Qty.push(arr.In_Qty);
              this.listDispenStockt[x]['In_Qty'] = In_Qty;
            } else {
              this.listDispenStockt.push(arr);
            }
          });
          this.listDispenStockt.length > 0
            ? (this.showDispenStockt = true)
            : '';
          // console.log(this.listDispenStockt);
          this.dataDispenStockt = new MatTableDataSource(this.listDispenStockt);
          this.dataDispenStockt.sort = this.sortDispenStockt;
          this.dataDispenStockt.paginator = this.paginDispenStockt;
        } else {
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

  selectDrugRefill(e: any) {
    // console.log(e);
    let lot = '';
    let exp = '';
    let key = new FormData();
    key.append('drugCode', e.DrugCd);
    this.services.post('DrugIden/drugToLot', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          lot = value.result[0]['LOT_NO'];
          exp = value.result[0]['exp_th'];
        }
      } else {
        this.services.alert(
          'error',
          'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
          'โปรดติดต่อผู้ดูแลระบบ'
        );
      }
      this.fromRefill = {
        rowNum: this.ListRefill.length,
        binID: e.binID,
        DrugCd: e.DrugCd,
        DrugNm: e.DrugNm,
        Refill: e.Refill,
        qrCode: '',
        Lotno: lot,
        Exp: exp,
      };
      _window.$(`#addRefill`).modal('show');
    });
  }

  formatDateExp(e: any) {
    const d = e.substring(0, 2);
    const m = e.substring(2, 4);
    const y = e.substring(4, 8);
    return y + '-' + m + '-' + d;
  }

  submitAddRefill() {
    // console.log(date.format('hmmss'));
    this.fromRefill.Exp = this.formatDateExp(this.fromRefill.Exp);
    // console.log(this.fromRefill.Exp)
    this.fromRefill.qrCode =
      this.fromRefill.binID +
      '|' +
      this.fromRefill.DrugCd +
      '|' +
      this.fromRefill.Refill +
      '|' +
      this.fromRefill.Lotno +
      '|' +
      this.fromRefill.Exp +
      '|' +
      moment().format('hhmmss');
    let arr: Array<any> = [];
    arr.push(this.fromRefill);
    this.dataRefill = [];
    if (!parseFloat(this.fromRefill.Refill)) {
      this.services.alert('warning', 'กรุณาใส่จำนวน');
      return;
    }
    if (this.fromRefill.Lotno.trim().length < 1) {
      this.services.alert('warning', 'กรุณาใส่ Lot');
      return;
    }
    if (this.fromRefill.Exp.trim().length < 1) {
      this.services.alert('warning', 'กรุณาใส่ Exp');
      return;
    }
    this.ListRefill.push(arr[0]);
    // console.log(this.ListRefill);
    this.dataRefill = new MatTableDataSource(this.ListRefill);
    this.dataRefill.sort = this.sortRefill;
    this.dataRefill.paginator = this.paginRefill;

    _window.$(`#addRefill`).modal('hide');
    this.clear();
  }

  removeRefill(e: any) {
    this.services
      .confirm(
        'warning',
        'ยืนยันการลบรายการ',
        e.DrugNm + 'Lot:' + e.Lotno + ' จำนวน:' + e.Refill
      )
      .then((val: any) => {
        if (val) {
          // console.log(e);
          this.dataRefill = [];
          this.ListRefill.splice(e.rowNum, 1);
          this.ListRefill.forEach((item, i) => {
            item.rowNum = i;
          });
          this.dataRefill = new MatTableDataSource(this.ListRefill);
          this.dataRefill.sort = this.sortRefill;
          this.dataRefill.paginator = this.paginRefill;
        }
      });
  }

  printPage() {
    window.print();
  }

  submitRefill(e: any) {
    // console.log(this.ListRefill);
    this.services
      .confirm('warning', 'ยืนยันการบันทึกข้อมูล', '')
      .then((val: any) => {
        if (val) {
          this.printNow = e;
          const refNo = moment().format('hhmmss') + '-' + this.positionid;
          let key = new FormData();
          key.append('refNo', refNo);
          key.append('positionid', this.positionid);
          key.append('maker', this.userID);
          // key.forEach((value, key) => {
          //   console.log(key + ' : ' + value);
          // });
          this.services
            .post('DrugIden/insertRefillH', key)
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
          this.ListRefill.forEach((el) => {
            let list = new FormData();
            list.append('refNo', refNo);
            list.append('binID', el.binID);
            list.append('drugCode', el.DrugCd);
            list.append('lot', el.Lotno);
            list.append('exp', el.Exp);
            list.append('qty', el.Refill);
            list.append('qrCode', el.qrCode);
            this.services
              .post('DrugIden/insertRefillD', list)
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
          setTimeout(() => {
            this.showRefillH();
          }, 500);
        }
      });
  }

  clear() {
    this.fromRefill = {
      rowNum: 0,
      binID: '',
      DrugCd: '',
      DrugNm: '',
      Refill: '',
      qrCode: '',
      Lotno: '',
      Exp: '',
    };
  }

  findDrugStock(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataDispenStockt.filter = filterValue.trim().toLowerCase();
  }

  printAlert() {
    const printContents: string | undefined =
      document.querySelector('.printAlert')?.innerHTML;

    if (printContents) {
      const printWindow = window.open('', '_blank', 'height=600,width=800');
      printWindow?.document.write(
        '<html><head><title>รายการยาที่ต้องเติม</title></head><body>'
      );
      printWindow?.document.write(printContents);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.focus();
      printWindow?.print();

      // เพิ่ม event listener สำหรับการคลิกพิมพ์ในหน้าต่าง printWindow
      printWindow?.addEventListener('afterprint', () => {
        printWindow?.close(); // ปิดหน้าต่างเมื่อทำการพิมพ์เสร็จแล้ว
      });
    }
  }

  findDrugRefill(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataRefill.filter = filterValue.trim().toLowerCase();
  }

  showRefillH() {
    this.show = 2;
    let key = new FormData();
    key.append('positionid', this.positionid);
    this.services.post('DrugIden/findRefillH', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.RefillH = value.result;
          let x = {
            value: this.RefillH[0]['refNo'],
          };
          this.selectRefNo(x);
        } else {
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

  selectRefNo(e: any) {
    let refNo: any;
    if (e.value) {
      // console.log(e.value);
      refNo = e.value;
    } else {
      // console.log(e.target.value);
      refNo = e.target.value;
    }
    this.ListRefill = [];
    this.dataRefill = [];
    let key = new FormData();
    key.append('refNo', refNo);
    this.services.post('DrugIden/findRefillD', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.ListRefill = value.result;
          this.dataRefill = new MatTableDataSource(this.ListRefill);
          this.dataRefill.sort = this.sortRefill;
          this.dataRefill.paginator = this.paginRefill;
          setTimeout(() => {
            this.printNow === 2 ? this.printPage() : '';
          }, 200);
        } else {
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

  showStock() {
    this.show = 1;
    this.printNow = 1;
    this.ListRefill = [];
    this.dataRefill = [];
  }

  viewQR = async (e: any) => {
    // console.log(e);
    const qrCodeData = e.qrCode;

    const qrCode = QRCodeGenerator(0, 'L');
    qrCode.addData(qrCodeData);
    qrCode.make();

    const qrCodeSize = 8;
    const qrCodeHtml = qrCode.createSvgTag(qrCodeSize, qrCodeSize);

    Swal.fire({
      title: e.DrugNm,
      html: qrCodeHtml,
      showCloseButton: true,
      showConfirmButton: false,
    });
  };
}
