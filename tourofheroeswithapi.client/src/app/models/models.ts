import { FormControl } from '@angular/forms';

export interface Hero {
  id: number;
  name: string;
  type: 'strength' | 'intelligence' | 'magic' | 'speed' | 'technology';
  superpower: string;
  rating: number;
  health: number;
  description: string;
}

export interface HeroFormModel {
  name: FormControl<string | null>;
  type: FormControl<string | null>;
  superpower: FormControl<string | null>;
  rating: FormControl<number | null>;
  health: FormControl<number | null>;
  description: FormControl<string | null>;
}

export interface ConfigInput {
  id: string;
  placeholderInfo: string;
  label: string;
}
