import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, private router: Router) {}

  production: boolean = false;

  rootPath: string = 'http://192.168.185.160:88/';
  apiPath: string = 'http://192.168.185.160:88/API_drugiden/index.php/';
  imgPath: string = 'http://192.168.185.160:3000/getimages?code=';
  localPath: string = 'http://192.168.185.160/DrugIdentification/#/';

  // rootPath: string = 'http://localhost:89/';
  // apiPath: string = 'http://localhost:89/API_drugiden/index.php/';
  // imgPath: string = 'http://localhost:3001/getimages?code=';
  // localPath: string = 'http://localhost:4200/#/';

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

  get(path: string) {
    this.production = true;
    return new Promise((resolve) => {
      this.http
        .get(this.apiPath + path)
        .toPromise()
        .then((value: any) => {
          resolve({ connect: true, ...value });
          this.production = false;
        })
        .catch((reason: any) => {
          resolve({ connect: false, ...reason });
          this.production = false;
        });
    });
  }

  getImg(path: string) {
    this.production = true;
    return new Promise((resolve) => {
      this.http
        .get(this.imgPath + path)
        .toPromise()
        .then((value: any) => {
          resolve({ connect: true, ...value });
          this.production = false;
        })
        .catch((reason: any) => {
          resolve({ connect: false, ...reason });
          this.production = false;
        });
    });
  }

  post(path: string, data: any) {
    this.production = true;
    return new Promise((resolve) => {
      this.http
        .post(this.apiPath + path, data)
        .toPromise()
        .then((value: any) => {
          resolve({ connect: true, ...value });
          this.production = false;
        })
        .catch((reason: any) => {
          resolve({ connect: false, ...reason });
          this.production = false;
        });
    });
  }

  alertTimer = (
    icon: 'error' | 'success' | 'warning',
    title: string,
    text: string = ''
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  alert = (
    icon: 'error' | 'success' | 'warning',
    title: string,
    text: string = ''
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonText: `ตกลง`,
      confirmButtonColor: '#3085d6',
    });
  };

  confirm = (
    icon: 'error' | 'success' | 'warning',
    title: string,
    text: string = ''
  ) => {
    return new Promise((res) => {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          res(result.isConfirmed);
        }
      });

      // Swal.fire({
      //   title: title,
      //   text: text,
      //   icon: icon,
      //   showCancelButton: true,
      //   cancelButtonColor: '#6c757d',
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonText: 'ยกเลิก',
      //   confirmButtonText: 'ตกลง',
      //   reverseButtons: true,
      //   focusCancel: true,
      //   focusConfirm: false,
      // }).then((result) => {
      //   res(result.isConfirmed);
      // });
    });
  };

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

  navRouter = (path: string, params: any = {}) => {
    this.router.navigate([`${path}`], { queryParams: params });
  };
}
