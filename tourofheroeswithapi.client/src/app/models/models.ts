export interface Hero {
  id: number;
  name: string;
  type: 'strength' | 'intelligence' | 'magic' | 'speed' | 'technology';
  rating: number;
  health: number;
  description: string;
}
