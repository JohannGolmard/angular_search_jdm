import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search-jdm';

  private lesRelations : any;

  constructor() {
    this.lesRelations = ["Domaine", "Objet" , "Caractéristique", "Synonyme", "Contraire"];
  }

}
