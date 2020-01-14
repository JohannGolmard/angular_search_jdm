import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgsRevealModule} from 'ngx-scrollreveal';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RelationComponent } from './relation/relation.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchResultComponent,
    SettingsComponent,
    RelationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgsRevealModule,
    AppRoutingModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
