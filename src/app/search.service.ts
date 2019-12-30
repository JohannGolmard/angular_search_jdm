import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public res: any;
  public _mot = new Subject<String>();
  public mot = this._mot.asObservable();

  constructor(private http: HttpClient) { }

  getDef(mot:any): Observable<any>{
  	let observable: Observable<any> = this.http.get("http://localhost:8888/def/"+mot);
    return observable;
  }

  getRelation(mot:any, num:any): Observable<any>{
    return this.http.get("http://localhost:8888/requete/"+mot+"/"+num);
  }

  public publish(data: String) {
    this._mot.next(data);
  }

}
