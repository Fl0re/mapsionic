import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl= 'http://localhost:8000/api/ApiUser'


  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  getUsers() {

    return new Promise(resolve => {
      let headers = new Headers();
        headers.append('Content-Type', 'application/json');

      this.http.get(this.apiUrl+'/user').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
