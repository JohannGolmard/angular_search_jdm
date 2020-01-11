import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

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

  constructor(private service: SearchService) {
    this.service.mot.subscribe((data) => {
      this.mot = data;
      this.printInfo();
    });
   }


  ngOnInit() { }

  cleanRamif(tabramif : any){
    let tempo = [];
    for (let item in tabramif) {
      if(item != '0'){ // on enlève le mot que l'on inspecte
          let split =tabramif[item].split(';');
          if(split.length  == 6) // certaines valeurs donne ex : biologie>45644513321 dont la valeur (biologie>étude du vivant) se trouve à l'indice 5 d'ou ce test
            tempo.push(split[5].split('\'').join(""));
          else
            tempo.push(split[2].split('\'').join(""));
      }
    }
    return tempo;
  }

  printInfo(){
    this.service.getDef(this.mot).subscribe(res =>{
      console.log(res);
      this.submitted = true;
      if(res[0].ramification)
        this.ramif = this.cleanRamif(res[0].ramification);
      else
        this.ramif = ["non"];
      if(res[0].definition=="\n\n"){
        this.def = "Aucune concrète.";
      }else{
        this.def = res[0].definition;
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
