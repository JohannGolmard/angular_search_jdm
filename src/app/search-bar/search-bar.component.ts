import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { SimpleChanges } from '@angular/core';
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
    this.test="";
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
  konar(ss:any){
    console.log(ss);
  }
  onKeyup(searchbar: string) {
    if(searchbar!=""){
      this.autoLoading=true;
       	this.service.getCompletion(searchbar).subscribe(res =>{
          for(let i in res){
            this.autocomp = [...this.autocomp, { "mt": res[i].mot }];
          }
          this.autoLoading=false;
        });
        this.autocomp = [];
	  }
}
//détection de l'évent d'appui sur la touche Entrée dans l'input de recherche
onEnter(searchterm: string) {
  if(searchterm!=null){
    this.service.publish(searchterm);
  }else if(this.test!=""){
    this.service.publish(this.test);
    this.test="";
  }
}

}
