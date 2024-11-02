import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../models/models';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  heroForm!: FormGroup;
  heroes: Hero[] = [];

  constructor(private fb: FormBuilder, private _heroService: HeroService ) {
  }

  ngOnInit(): void {
    this.heroForm = this.fb.group({
     name: ['', Validators.required],
      type: ['', Validators.required],
      superpower: [''],
      rating: [0],
      health: [0],
      description: ['']
    });
    this._heroService.getAllHeroes().subscribe(result => {
      console.log(result)
    })
  }

  handleSubmit(): void {
    if (this.heroForm.valid) {
      console.log(this.heroForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  getFormControl(controlName: string) {
    return this.heroForm.get(controlName) as FormControl;
  }
}
