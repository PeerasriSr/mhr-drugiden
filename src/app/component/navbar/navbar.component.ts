import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  ip: any;
  device: Array<any> = [];
  deviceName: any;
  deviceLocat: any;
  userName: any = null;
  regis = false;

  constructor(private services: AppService) {
    this.userName = sessionStorage.getItem('userName');
  }

  ngOnInit(): void {
    this.getIP();
  }

  closeDropdown() {
    const button = document.querySelector(
      '.navbar-toggler'
    ) as HTMLButtonElement;
    if (button) {
      button.click();
    }
  }

  getIP = async () => {
    this.services.get('DrugIden/showIP').then((value: any) => {
      // console.log(value);
      if (value.connect) {
        this.ip = Object.values(value)
          .filter((value) => typeof value === 'string')
          .join('');
        this.checkIP();
      } else {
        this.services.alert(
          'error',
          'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
          'โปรดติดต่อผู้ดูแลระบบ'
        );
      }
    });
  };

  checkIP = async () => {
    let key = new FormData();
    key.append('ip', this.ip);
    this.services.post('DrugIden/checkIP', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.rowCount > 0) {
          this.device = value.result;
          this.regis = true;
          this.deviceName = this.device[0]['deptName'];
          this.deviceLocat = this.device[0]['location'];
          sessionStorage.setItem('location', this.deviceLocat);
          sessionStorage.setItem('locationNm', this.deviceName);
          sessionStorage.setItem('locationPhone', this.device[0]['phone']);
          if (this.deviceLocat != 'W7') {
            this.services.navRouter('/Ward/CheckDrug');
          }
        }
      } else {
        this.services.alert(
          'error',
          'ไม่สามารถเชื่อมต่อกับเซิฟเวอร์ได้',
          'โปรดติดต่อผู้ดูแลระบบ'
        );
      }
      // console.log(this.device);
    });
  };

  logIn() {}

  register() {
    Swal.fire('กรุณาติดต่อห้องยา และแจ้ง IP Address :', this.ip, 'info');
  }

  logOut() {
    this.services
      .confirm('warning', 'ออกจากระบบ', '')
      .then(async (val: any) => {
        if (val) {
          this.userName = null;
          sessionStorage.clear();
          this.services.navRouter('/Index');
        }
      });
  }
}
