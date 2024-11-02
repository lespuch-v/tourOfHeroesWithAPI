import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { HeroFormModel } from '../models/models';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent implements OnInit {
  heroForm!: FormGroup<HeroFormModel>;

  constructor(private fb: FormBuilder, private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group<HeroFormModel>({
      name: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      type: this.fb.control('', { validators: [Validators.required], nonNullable: true }),
      superpower: this.fb.control('', { nonNullable: true }),
      rating: this.fb.control(0, { nonNullable: true }),
      health: this.fb.control(0, { nonNullable: true }),
      description: this.fb.control('', { nonNullable: true })
    });
  }

  handleSubmit(): void {
    if (this.heroForm.valid) {
      const formValue = this.heroForm.getRawValue();
      console.log(formValue);
    } else {
      console.log('Form is invalid');
    }
  }

  getFormControl(controlName: string): FormControl {
    return this.heroForm.get(controlName) as FormControl;
  }}
