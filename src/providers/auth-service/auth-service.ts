import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = 'http://localhost:8000/api/ApiUser';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  login() {
    return new Promise(resolve => {
      this.http.get(apiUrl+'/user').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
    marker() {
      return new Promise(resolve => {
        this.http.get(apiUrl+'/markers').subscribe(data => {
          resolve(data);
        }, err => {
          console.log(err);
        });
      });
  

}
}