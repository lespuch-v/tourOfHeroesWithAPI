import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeroesComponent } from '../heroes/heroes.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

  selectedTabIndex: number = 0;
  tabs: string[] = ['dashboard', 'heroes']
  componentMap: { [key: string]: any } = {
    'dashboard': DashboardComponent,
    'heroes': HeroesComponent,
  };

  selectTab(i: number) {
    this.selectedTabIndex = i;
  }
}
