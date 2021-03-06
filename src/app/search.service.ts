import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public res: any;
  //private server = "http://localhost:8888";
  public server = "http://15.188.255.38:8888";
  public _mot = new Subject<String>();
  public mot = this._mot.asObservable();

  constructor(private http: HttpClient) { }

  getDef(mot:any): Observable<any>{
  	let observable: Observable<any> = this.http.get(this.server+"/def/"+mot);
    return observable;
  }

  addMot(mot:any): Observable<any>{
    let data = {"mot":mot};
    return this.http.post(this.server+"/addMots",data);
  }

  getRelation(mot:any, num:any): Observable<any>{
    return this.http.get(this.server+"/requete/"+mot+"/"+num);
  }

  public publish(data: String) {
    this._mot.next(data);
  }
  getCompletion(mot:any): Observable<any>{
    return this.http.get(this.server+"/completion/"+mot);
  }

}
