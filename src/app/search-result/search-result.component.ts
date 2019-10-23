import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private service: SearchService) { }

  private def : any;
  private ramif : any;
  private submitted : boolean = false;

  ngOnInit() {
  }

  ngDoCheck(){
  	if(this.service.res != null){
		this.submitted = true;
		this.ramif = this.service.res[0].ramification;
		if(this.service.res[0].definition=="\n"){
			this.def = "Aucune concrète.";
		}else{
			this.def = this.service.res[0].definition;
		}
  	}
  }

}
