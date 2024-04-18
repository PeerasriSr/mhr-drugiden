import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ip: any;
  userLogin: any = null;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private services: AppService) {
    this.ip = sessionStorage.getItem('ip');
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginSubmit() {
    let key = new FormData();
    key.append('username', this.loginForm.value.username);
    key.append('password', this.loginForm.value.password);
    this.services.post('DrugIden/login', key).then((value: any) => {
      // console.log(value);
      if (value.connect) {
        if (value.success) {
          sessionStorage.setItem('userID', value.userData.code);
          sessionStorage.setItem('userName', value.userData.name);
          sessionStorage.setItem('userRole', value.userData.role);
          this.services.alertTimer('success', value.message);
          this.services.navRouter('/Index');
        } else {
          this.services.alert('error', value.message);
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
