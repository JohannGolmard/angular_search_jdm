import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-relation',
  templateUrl: './relation.component.html',
  styleUrls: ['./relation.component.css']
})
export class RelationComponent implements OnInit {

  @Input() nomRelation: string;

  @Output() changePlace = new EventEmitter<string>();

  public lesRelations : any;
  public numeroRelation: any;
  public mot: any;
  public motRechercheAvance : any;
  public res : any;
  public cacher : boolean = false;
  public tabSansTrie : any[] = [];
  public tabMotTrierPoids : any[] = [];
  public tabMotTrierFr : any[] = [];
  public tabRecherche : any[] = [];
  public tabPoidsDesMots : any[] = [];
  public trieFrancais : boolean = true; //trie fr actif sinon trie par poids
  public limiteAffichage : number = 50;
  public cacherOuPas : String = "Cacher";

  constructor(private service: SearchService) {
    this.lesRelations = {"Domaine" : 3, "Objet" : 14, "Caractéristique" : 17, "Synonyme":5, "Contraire":7};
    this.service.mot.subscribe((data) => {
        this.tabMotTrierPoids = [];
        this.tabMotTrierFr = [];
        this.tabSansTrie = [];
        this.tabRecherche = [];
        this.tabPoidsDesMots = [];
        this.motRechercheAvance = "";
        this.mot = data;
        this.numeroRelation = this.lesRelations[this.nomRelation];
        this.getRelation();
    });
  }

  upOrDown(value :string){
    this.changePlace.emit(value);
  }

  hide(){
    if(this.cacher){
      $('.'+this.nomRelation).css("display", "contents");
      this.cacherOuPas = "Cacher";
      this.cacher = false;
    }else{
      $('.'+this.nomRelation).css("display", "none");
      this.cacherOuPas = "Ouvrir";
      this.cacher = true;
    }
  }

  trieFr(){
    if(this.motRechercheAvance){
      this.res.data = this.tabRecherche.sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}));
    }else
      this.res.data = this.tabMotTrierFr;
    this.trieFrancais = true;
  }

  triePoids(){
    if(this.motRechercheAvance){
      let poid = [];
      for(let mot in this.tabSansTrie){
        for(let motRecherche in this.tabRecherche){
          if(this.tabSansTrie[mot] ==  this.tabRecherche[motRecherche])
            poid.push(this.tabPoidsDesMots[mot]);
        }
      }
      this.res.data = this.returnMakeTriePoids(poid,this.tabRecherche);
    }else
      this.res.data = this.tabMotTrierPoids;
    this.trieFrancais = false;
  }

  searchMot(mot : any){
    this.service.publish(mot);
  }

  returnMakeTriePoids(tabPoid : any, tabMot : any){
    let tabAssociatif = new Array();
    let rez = [];
    for(let item in tabMot){
      tabAssociatif.push({name: tabMot[item], val: tabPoid[item]});
    }

    tabAssociatif.sort(function(a, b) {    return b.val - a.val;   });
    for(let item in tabAssociatif){
      rez.push(tabAssociatif[item].name)
    }
    return rez;
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
          if(!res.data[item].match(new RegExp("="))){
            let split = res.data[item].split(';');
            tabPoidsMot.push(split[4]);
            if(split.length  == 6) // certaines valeurs donne ex : biologie>45644513321 dont la valeur (biologie>étude du vivant) se trouve à l'indice 5 d'ou ce test
              tempo.push(split[5].split('\'').join(""));
            else
              tempo.push(split[2].split('\'').join(""));
          }
        }
      }
      this.tabPoidsDesMots = tabPoidsMot;
      res.data = tempo;
      this.res = res;
      this.tabSansTrie = res.data;
      this.makeTriePoids(tabPoidsMot, res.data);
      this.tabMotTrierFr = this.res.data.sort((a, b) => a.localeCompare(b, 'fr', {ignorePunctuation: true}));
      this.trieFr();
    });
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      if(this.motRechercheAvance != ""){
        this.tabRecherche = [];
        let recherche = this.motRechercheAvance;
        for(let mot in this.tabSansTrie){
          if(this.tabSansTrie[mot].match(new RegExp(recherche)))
            this.tabRecherche.push(this.tabSansTrie[mot]);
        }
     }
     if(this.trieFrancais){
       this.trieFr();
     }else{
       this.triePoids();
     }
    }
  }

  ngOnInit() {

  }

}
