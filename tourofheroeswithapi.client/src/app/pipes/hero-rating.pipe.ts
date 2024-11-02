import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroRating'
})
export class HeroRatingPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 100 && value >= 90){
      return '🏆'
    }else if (value <= 89 && value >= 80){
      return '⭐'
    }else if (value <=79 && value >= 70){
      return '💫'
    } else {
      return '⚡'
    }
  }
}
