import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked  } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterViewChecked {

  private allRelations : Array<string>;

  @Output() tabRelationAfficherChange = new EventEmitter<any[]>();

  @Input() tabRelationAfficher: any[];

  constructor() {
    $(document).ready(function(){
        (<any>$('.ui.checkbox')).checkbox();
    });
    this.allRelations = ["Domaine"  ,"Partie Discours", "Synonyme", "Générique" , "Contraire", "Hyponyme", "Constituant", "Holonymes", "Locution", "Agent"  ,"Objet"  , "Lieu"  , "Instrument"   ,"Caractéristique"  , "Lemme", "Amplification", "Affaiblissement", "Famille", "Peut faire", "Peut faire (instrument)", "Inverse d'Objet", "Action lieu", "Sentiment", "Manières", "Signification","Rôle télique", "Role agentif", "Verbe action", "Action verbe", "Consequence", "Cause", "Adjectif verbe", "Verbe adjectif", "Temporelle", "Object matière", "Matière objet", "Suivre temporellement", "Produire", "Ressultat de", "Opposition", "Implication","Quantificateur", "Masculin", "Féminin" , "Strictement équivalent", "Agentif applicatif", "Instance de type", "Verbe réalise l'action", "Similaire", "Element compose l'ensemble", "Enesemble qui est composé par l'élément","Acteur processus", "Variante", "Termes strictement substituables", "Plus gros", "Moins gros", "Accompagné", "Patient du processus", "Partice passé", "Co-hyponymes", "Paricipe présent", "Instrument du processus", "Dérivation morphologique", "Auteur de l'oeuvre", "Personnage de l'oeuvre", "Nourriture animal", "Acteur film", "Mode de déplacement", "Interprète du personnage", "Couleur", "Cible de la maladie", "Symptomes maladie", "Précéder temporellement", "Diagnostique maladie", "Précéder spatialement", "Suivre spatialement", "Relation sociale", "Tributaire", "Sentiment associé", "Relié avec", "But de l'action", "Possede", "Qui est possede", "Auxiliaire verbe","Précéder logiquement", "Suivre logiquement", "Incompatible", "Requis", "Est instance de", "est concerné par", "Inverse de symptome", "Unité", "Favorise", "Circonstances", "Oeuvre de l'auteur", "Complément d'agent", "Beneficiaire", "Descende de", "Domaine de substitution", "Propriété", "Voix active verbe", "Ce qu'utilise un objet", "Est utilisé par", "Adjectif -> nom propriété", "Nom propriété -> adjectif", "Adjectif -> adverbe", "Adverbe -> adjectif", "Homophone", "Confusion potentielle", "Concerne", "Adjectif -> Nom", "Nom -> Adjectif", "Opinion", "Traduction", "Wikipédia", "Inhibition" ];

   }

   initCheckbox(){
     for(let i = 0 ; i < this.allRelations.length; i++){
       for(let j =0; j< this.tabRelationAfficher.length; j++){
         if(this.tabRelationAfficher[j]===this.allRelations[i]){
           (<any>$('#'+i)).prop("checked", true);
           break;
         }
       }
     }
   }

  updateCheckedOptions(rela :string, id:string){

      if($('#'+id).prop("checked") == true){
          this.tabRelationAfficher.push(rela);
      }
      else if($('#'+id).prop("checked") == false){
          this.tabRelationAfficher.splice(this.tabRelationAfficher.indexOf(rela), 1);
      }

      this.tabRelationAfficherChange.emit(this.tabRelationAfficher);
      console.log(this.tabRelationAfficher);
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.initCheckbox()
  }

}
