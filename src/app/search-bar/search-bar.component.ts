import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

	myControl : any;
	options: string[];
  constructor() { }

  ngOnInit() {
  	this.myControl = new FormControl();
  	this.options = ['Exemple alakon', 'Chargé depuis le composant', 'Récupérer la liste via un service Angular vers Node'];
  }

}
