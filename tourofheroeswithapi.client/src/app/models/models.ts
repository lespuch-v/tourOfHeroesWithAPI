import { FormControl } from '@angular/forms';

export type HeroType = 'strength' | 'intelligence' | 'magic' | 'speed' | 'technology';

export interface Hero {
  id: number;
  name: string;
  type: HeroType;
  superpower: string;
  rating: number;
  health: number;
  description: string;
}

export interface HeroFormModel {
  name: FormControl<string>;
  type: FormControl<HeroType>;
  superpower: FormControl<string>;
  rating: FormControl<number>;
  health: FormControl<number>;
  description: FormControl<string>;
}

export interface CreateHeroDTO {
  name: string;
  type: 'strength' | 'intelligence' | 'magic' | 'speed' | 'technology';
  superpower: string;
  rating: number;
  health: number;
  description: string;
}
