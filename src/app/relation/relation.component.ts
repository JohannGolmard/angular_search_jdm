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
    this.lesRelations = {"Domaine" : 3,"Partie Discours":4, "Synonyme":5, "Générique": 6, "Contraire":7, "Hyponyme":8, "Constituant":9, "Holonymes":10, "Locution":11, "Agent" : 13,"Objet" : 14, "Lieu" : 15, "Instrument" : 16 ,"Caractéristique" : 17, "Lemme":19, "Amplification":20, "Affaiblissement":21, "Famille":22, "Peut faire":24, "Peut faire (instrument)":25, "Inverse d'Objet":26, "Action lieu":30, "Sentiment":32, "Manières":34, "Signification":35,"Rôle télique":37, "Role agentif":38, "Verbe action":39, "Action verbe":40, "Consequence":41, "Cause":42, "Adjectif verbe":43, "Verbe adjectif":44, "Temporelle":49, "Object matière":50, "Matière objet":51, "Suivre temporellement":52, "Produire":53, "Ressultat de":54, "Opposition":55, "Implication":57,"Quantificateur":58, "Masculin":59, "Féminin": 60, "Strictement équivalent":61, "Agentif applicatif":63, "Instance de type":64, "Verbe réalise l'action":65, "Similaire":67, "Element compose l'ensemble":68, "Enesemble qui est composé par l'élément":69,"Acteur processus":70, "Variante":71, "Termes strictement substituables":72, "Plus gros":73, "Moins gros":74, "Accompagné":75, "Patient du processus":76, "Partice passé":77, "Co-hyponymes":78, "Paricipe présent":79, "Instrument du processus":80, "Dérivation morphologique":99, "Auteur de l'oeuvre":100, "Personnage de l'oeuvre":101, "Nourriture animal":102, "Acteur film":103, "Mode de déplacement":104, "Interprète du personnage":105, "Couleur":106, "Cible de la maladie":107, "Symptomes maladie":108, "Précéder temporellement":109, "Diagnostique maladie":110, "Précéder spatialement":111, "Suivre spatialement":112, "Relation sociale":113, "Tributaire":114, "Sentiment associé":115, "Relié avec":116, "But de l'action":119, "Possede":121, "Qui est possede":122, "Auxiliaire verbe":123,"Précéder logiquement":124, "Suivre logiquement":125, "Incompatible":127, "Requis":129, "Est instance de":130, "est concerné par":131, "Inverse de symptome":132, "Unité":133, "Favorise":134, "Circonstances":135, "Oeuvre de l'auteur":136, "Complément d'agent":149, "Beneficiaire":150, "Descende de":151, "Domaine de substitution":152, "Propriété":153, "Voix active verbe":154, "Ce qu'utilise un objet":155, "Est utilisé par":156, "Adjectif -> nom propriété":157, "Nom propriété -> adjectif":158, "Adjectif -> adverbe":159, "Adverbe -> adjectif":160, "Homophone":161, "Confusion potentielle":162, "Concerne":163, "Adjectif -> Nom":164, "Nom -> Adjectif":165, "Opinion":166, "Traduction":333, "Wikipédia":777, "Inhibition":999 };

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
