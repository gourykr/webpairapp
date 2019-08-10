import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let apiUrl = 'http://www.wedpair.com/Api/';
@Injectable()
export class RemoteServiceProvider {
 results={};
  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
  }

    postData(credentials, type) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, JSON.stringify(credentials))
        .subscribe(res => {
         this.results = res;
         console.log(res);
         resolve(this.results);
        }, (err) => {
          reject(err);
        });
    });

  }

  getData(type) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + type)
        .subscribe(res => {
         this.results = res;
         console.log(res);
         resolve(this.results);
        }, (err) => {
          reject(err);
        });
    });

  }

}
