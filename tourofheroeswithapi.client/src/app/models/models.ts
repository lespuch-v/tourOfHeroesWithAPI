export interface Hero {
  id: number;
  name: string;
  type: 'strength' | 'intelligence' | 'magic' | 'speed' | 'technology';
  superpower: string;
  rating: number;
  health: number;
  description: string;
}
