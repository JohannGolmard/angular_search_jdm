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

  ngOnInit() {
  	if(this.service.res != null){
  		console.log("prout");
  	}
  	console.log("pouet");
  }

}
