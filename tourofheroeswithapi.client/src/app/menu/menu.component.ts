import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

  constructor(private router: Router) {}

  selectedTabIndex: number = 0;
  tabs: string[] = ['dashboard', 'heroes']

  selectTab(i: number) {
    this.selectedTabIndex = i;
    this.router.navigate([this.tabs[i]]);
  }
}
