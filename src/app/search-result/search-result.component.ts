import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

    private mot : any;
    private def : any;
    private ramif : any;
    private submitted : boolean = false;
    private limiteDef : number = 150;

  constructor(private service: SearchService, private ngxService: NgxUiLoaderService) {
    this.service.mot.subscribe((data) => {
      this.mot = data;
      this.printInfo();
    });
   }


  ngOnInit() { }


  makeTriePoids(tabPoid : any, tabMot : any){
    let tabAssociatif = new Array();
    for(let item in tabMot){
      tabAssociatif.push({name: tabMot[item], val: tabPoid[item]});
    }

    tabAssociatif.sort(function(a, b) {    return b.val - a.val;   });
    let rez = [];
    for(let item in tabAssociatif){
      rez.push(tabAssociatif[item].name)
    }
    return rez;
  }


  cleanRamif(tabramif : any){
    let tabPoidsMot = [];
    let tempo = [];
    for (let item in tabramif) {
      if(item != '0'){ // on enlève le mot que l'on inspecte
          let split =tabramif[item].split(';');
          tabPoidsMot.push(split[4]);
          if(split.length  == 6) // certaines valeurs donne ex : biologie>45644513321 dont la valeur (biologie>étude du vivant) se trouve à l'indice 5 d'ou ce test
            tempo.push(split[5].split('\'').join(""));
          else
            tempo.push(split[2].split('\'').join(""));
      }
    }
    return this.makeTriePoids(tabPoidsMot,tempo);
  }

  searchMot(mot : any){
    this.service.publish(mot);
  }

  printInfo(){
    this.service.getDef(this.mot).subscribe(res =>{
      this.submitted = true;
      if(res[0].ramification)
        this.ramif = this.cleanRamif(res[0].ramification);
      else
        this.ramif = [""];
      if(res[0].definition=="\n\n"){
        this.def = "Aucune concrète.";
      }else{
        this.def = res[0].definition;
      }
      if(res[0].definition!="\n\n" || res[0].ramification){
        this.service.addMot(this.mot).subscribe(res =>{});
      }
    });
  }
  //
  // ngDoCheck(){
  // 	if(this.service.res != null){
	// 	this.submitted = true;
	// 	this.ramif = this.service.res[0].ramification;
	// 	if(this.service.res[0].definition=="\n"){
	// 		this.def = "Aucune concrète.";
	// 	}else{
	// 		this.def = res[0].definition;
	// 	}
  // 	}
  // }

}
