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
  private tabMotTrierPoids : any[] = [];
  private tabMotTrierFr : any[] = [];
  private trieFrancais : boolean = true; //trie fr actif sinon trie par poids
  private limiteAffichage : integer = 50;

  constructor(private service: SearchService) {
    this.numeroRelation = 3;
    this.nomRelation = "Domaine";

    this.service.mot.subscribe((data) => {
      this.mot = data;
      this.getRelation();
    });
  }

  trieFr(){
    this.res.data = this.tabMotTrierFr;
    this.trieFrancais = true;
  }

  triePoids(){
    this.res.data = this.tabMotTrierPoids;
    this.trieFrancais = false;
  }

  searchMot(mot : any){
    this.service.publish(mot);
  }

  makeTriePoids(tabPoid : any, tabMot : any){
    let tabAssociatif = new Array();
    for(let item in tabMot){
      tabAssociatif.push({name: tabMot[item], val: tabPoid[item]});
    }

    tabAssociatif.sort(function(a, b) {    return b.val - a.val;   });
    for(let item in tabAssociatif){
      this.tabMotTrierPoids.push(tabAssociatif[item].name)
    }

  }

  getRelation(){
    this.service.getRelation(this.mot, this.numeroRelation).subscribe(res =>{
      let tempo = [];
      let tabPoidsMot = [];
      for (let item in res.data) {
        if(item != '0'){ // on enlève le mot que l'on inspecte
            let split = res.data[item].split(';');
            tabPoidsMot.push(split[4]);
            if(split.length  == 6) // certaines valeurs donne ex : biologie>45644513321 dont la valeur (biologie>étude du vivant) se trouve à l'indice 5 d'ou ce test
              tempo.push(split[5].split('\'').join(""));
            else
              tempo.push(split[2].split('\'').join(""));
        }
      }
      res.data = tempo;
      this.res = res;
      this.makeTriePoids(tabPoidsMot, res.data);
      this.tabMotTrierFr = this.res.data.sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}));
      this.trieFr();
    });
  }

  ngOnInit() {

  }

}
