import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

  private numeroRelation: any;
  private nomRelation: any;
  private mot: any;
  private res : any;

  constructor(private service: SearchService) {
    this.numeroRelation = 3;
    this.nomRelation = "Domaine";
    this.mot = "chat";
  }

  // bouger le code dans  ngDoCheck surement ! 
  ngOnInit() {
    this.service.getRelation(this.mot, this.numeroRelation).subscribe(res =>{
      let tempo = [];

      console.log(res.data);

      for (let item in res.data) {
        if(item != '0'){ // on enlève le mot que l'on inspecte
            let split = res.data[item].split(';');
            if(split.length  == 6) // certaines valeurs donne ex : biologie>45644513321 dont la valeur (biologie>étude du vivant) se trouve à l'indice 5 d'ou ce test
              tempo.push(split[5].split('\'').join(""));
            else
              tempo.push(split[2].split('\'').join(""));
        }
      }
      res.data = tempo;
      this.res = res;
    });
  }

}
