import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { FirstLetterUpperCasePipe } from './pipes/first-letter-upper-case.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroInfoInputComponent } from './hero-info-input/hero-info-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddHeroModalComponent } from './add-hero-modal/add-hero-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    FirstLetterUpperCasePipe,
    DashboardComponent,
    HeroesComponent,
    HeroInfoInputComponent,
    AddHeroModalComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule,
    AppRoutingModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
