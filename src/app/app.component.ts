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

  upOrDown(val :string){
    let split = val.split('_');
    if(split[1]=="D")
      this.down(split[0]);
    else
      this.up(split[0]);
  }

  up(val :string){
    let indice = 0;
    for(let rela = 0 ; rela < this.lesRelations.length; rela++){
      if(this.lesRelations[rela]==val)
        indice = rela;
    }
    if(indice != 0 ){
      let tempo = this.lesRelations[indice-1];
      this.lesRelations[indice-1]=val;
      this.lesRelations[indice]=tempo;
    }
  }

  down(val :string){
    let indice = 0;
    for(let rela = 0 ; rela < this.lesRelations.length; rela++){
      if(this.lesRelations[rela]==val)
        indice = rela;
    }
    if(indice != this.lesRelations.length-1 ){
      let tempo = this.lesRelations[indice+1];
      this.lesRelations[indice+1]=val;
      this.lesRelations[indice]=tempo;
    }
  }

}
