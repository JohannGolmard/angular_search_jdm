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

  private _mot: any;
  private resultat: any;
  private autocomp: any;

  constructor(private service: SearchService) {

    this.service.mot.subscribe((data) => {
      this._mot = data;
    });

  }
  //définition de getter et setter afin d'appeler onChanges que lorsque la variable lié à l'input est maj
  get mot(): any {
        return this._mot;
    }
  set mot(value: any) {
        if (value !== this._mot) {
            this._mot = value;
            this.onChanges();
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
//détection de l'évent d'appui sur la touche Entrée dans l'input de recherche
  onKeydown(event) {
  if (event.key === "Enter") {
    if(this.mot!=""){
      this.service.publish(this.mot);
	  }
  }
}

}
