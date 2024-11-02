import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface ConfigInput {
  id: number;
  placeholderInfo: string;

}

@Component({
  selector: 'app-hero-info-input',
  templateUrl: './hero-info-input.component.html',
  styleUrl: './hero-info-input.component.css'
})
export class HeroInfoInputComponent {
  @Input() inputConfig!: ConfigInput;
  @Input() control!: FormControl;
}
