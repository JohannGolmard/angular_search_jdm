import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'search-jdm';

  private lesRelations : any;
  private allRelations : any;

  constructor() {
    this.allRelations = ["Domaine"  ,"Partie Discours", "Synonyme", "Générique" , "Contraire", "Hyponyme", "Constituant", "Holonymes", "Locution", "Agent"  ,"Objet"  , "Lieu"  , "Instrument"   ,"Caractéristique"  , "Lemme", "Amplification", "Affaiblissement", "Famille", "Peut faire", "Peut faire (instrument)", "Inverse d'Objet", "Action lieu", "Sentiment", "Manières", "Signification","Rôle télique", "Role agentif", "Verbe action", "Action verbe", "Consequence", "Cause", "Adjectif verbe", "Verbe adjectif", "Temporelle", "Object matière", "Matière objet", "Suivre temporellement", "Produire", "Ressultat de", "Opposition", "Implication","Quantificateur", "Masculin", "Féminin" , "Strictement équivalent", "Agentif applicatif", "Instance de type", "Verbe réalise l'action", "Similaire", "Element compose l'ensemble", "Enesemble qui est composé par l'élément","Acteur processus", "Variante", "Termes strictement substituables", "Plus gros", "Moins gros", "Accompagné", "Patient du processus", "Partice passé", "Co-hyponymes", "Paricipe présent", "Instrument du processus", "Dérivation morphologique", "Auteur de l'oeuvre", "Personnage de l'oeuvre", "Nourriture animal", "Acteur film", "Mode de déplacement", "Interprète du personnage", "Couleur", "Cible de la maladie", "Symptomes maladie", "Précéder temporellement", "Diagnostique maladie", "Précéder spatialement", "Suivre spatialement", "Relation sociale", "Tributaire", "Sentiment associé", "Relié avec", "But de l'action", "Possede", "Qui est possede", "Auxiliaire verbe","Précéder logiquement", "Suivre logiquement", "Incompatible", "Requis", "Est instance de", "est concerné par", "Inverse de symptome", "Unité", "Favorise", "Circonstances", "Oeuvre de l'auteur", "Complément d'agent", "Beneficiaire", "Descende de", "Domaine de substitution", "Propriété", "Voix active verbe", "Ce qu'utilise un objet", "Est utilisé par", "Adjectif -> nom propriété", "Nom propriété -> adjectif", "Adjectif -> adverbe", "Adverbe -> adjectif", "Homophone", "Confusion potentielle", "Concerne", "Adjectif -> Nom", "Nom -> Adjectif", "Opinion", "Traduction", "TOTAKI", "Wikipédia", "Inhibition" ];
    this.lesRelations = ["Domaine"  ,"Partie Discours", "Synonyme", "Générique" , "Contraire", "Hyponyme", "Constituant"];
  }

  upOrDown(val :string){
    let split = val.split('_');
    if(split[1]=="D")
      this.down(split[0]);
    else
      this.up(split[0]);
  }

  up(val :string){
    let indice = -1;
    for(let rela = 0 ; rela < this.lesRelations.length; rela++){
      if(this.lesRelations[rela]==val)
        indice = rela;
    }
    if(indice != 0 && indice != -1){
      let tempo = this.lesRelations[indice-1];
      this.lesRelations[indice-1]=val;
      this.lesRelations[indice]=tempo;
    }
  }

  down(val :string){
    let indice = -1;
    for(let rela = 0 ; rela < this.lesRelations.length; rela++){
      if(this.lesRelations[rela]==val)
        indice = rela;
    }

    if(indice != this.lesRelations.length-1 && indice != -1 ){
      let tempo = this.lesRelations[indice+1];
      this.lesRelations[indice+1]=val;
      this.lesRelations[indice]=tempo;
    }
  }

}
