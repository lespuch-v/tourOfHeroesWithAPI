import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../models/models';
import { HeroService } from '../hero.service';
import { AddHeroModalComponent } from '../add-hero-modal/add-hero-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  randomHeroes: Hero[] = [];
  @ViewChild('addHereModal') addHeroModal!: AddHeroModalComponent;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getTopRandomHeroes(4).subscribe(heroes => {
      this.randomHeroes = heroes;
    });
  }

  openAddHeroModal(): void {
    this.addHeroModal.openModal();
  }
}
