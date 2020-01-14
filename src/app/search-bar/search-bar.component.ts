import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { fromEvent } from 'rxjs/index';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
//obsolète avec la gestion du getter/setter avec ng-select
  private _mot: any;
  private resultat: any;
  private autocomp : any;
  public autoLoading = false;
  public test: string;
  constructor(private service: SearchService) {
    this.autocomp= [];
    this.service.mot.subscribe((data) => {
      this._mot = data;
    });

  }
  //définition de getter et setter afin d'appeler onChanges que lorsque la variable lié à l'input est maj
  get mot(): any {
        return this._mot;
    }
  set mot(val: any) {
        if (val !== this._mot) {
            this._mot = val;
            //this.onChanges();
        }
    }

  ngOnInit() {
  }
  onChanges(){
  	// if(this.mot!=""){
	  // 	this.service.getDef(this.mot).subscribe(res =>{
		// 	this.resultat = res;
		// 	console.log(res);
	  //   });
    // }
  }
delegated(){

}
  onKeyup(event:any,searchbar: string) {
    //let test = fromEvent(event.target, 'keyup').pipe(debounceTime(1000));
    //test.subscribe(() => console.log("aled"));
    /*if(searchbar!=="" && searchbar!==null && event.target.keyCode !== 8 && event.target.keyCode !== 13){
      console.log("ça passe "+searchbar);
      let test = fromEvent(event.target, 'keyup').pipe(debounceTime(1000));
      test.subscribe((x) => {
        if(event.target.keyCode !== 8 && event.target.keyCode !== 13){
          console.log(x);
          this.autoLoading=true;
            this.service.getCompletion(searchbar).subscribe(res =>{
              for(let i in res){
                this.autocomp = [...this.autocomp, { "mt": res[i].mot }];
              }
              console.log(this.autocomp);
              this.autoLoading=false;
            });
                                  this.autocomp = [];
        }
    });}*/
    if(searchbar!=="" && searchbar!==null && event.target.keyCode !== 8 && event.target.keyCode !== 13){
        setTimeout(() => {
          console.log("bloup "+searchbar);
          this.autoLoading=true;
           	this.service.getCompletion(searchbar).subscribe(res =>{
              for(let i in res){
                this.autocomp = [...this.autocomp, { "mt": res[i].mot }];
              }
              this.autoLoading=false;
            });
            this.autocomp = [];
    	  },1000);
      }
}
//détection de l'évent d'appui sur la touche Entrée dans l'input de recherche
onEnter(searchterm: string) {
if(searchterm !==null && searchterm!=="" && searchterm!==undefined){
    console.log("appel searchterm "+searchterm);
    this.service.publish(searchterm);
    this.test= null;
  }else if(this.test!== null && this.test!=="" && this.test!==undefined){
    console.log("appel test "+this.test);
    this.service.publish(this.test);
  }
}

}
