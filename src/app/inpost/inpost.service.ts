import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class InpostService {

  constructor(private http: HttpClient) { }

  // getScript(): void {
  //   this.http.get('https://geowidget.easypack24.net/js/sdk-for-javascript.js', {headers: {'Content-Type': 'application/javascript'}}).subscribe(
  //     data => console.log(data)
  //   );
  // }
}
