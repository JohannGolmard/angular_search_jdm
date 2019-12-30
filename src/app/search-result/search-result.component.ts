import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private service: SearchService) {

    this.service.mot.subscribe((data) => {
      this.service.getDef(this.mot).subscribe(res =>{
        console.log(res);
        this.printInfo(res);
        this.mot = data;
	    });
    });

   }

  private mot : any;
  private def : any;
  private ramif : any;
  private submitted : boolean = false;

  ngOnInit() {
  }

  printInfo(res:any){
    if(res != null){
      this.submitted = true;
      if(res[0].ramification)
        this.ramif = res[0].ramification;
      else
        this.ramif = ["non"];
      if(res[0].definition=="\n"){
        this.def = "Aucune concrète.";
      }else{
        this.def = res[0].definition;
      }
    }

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
