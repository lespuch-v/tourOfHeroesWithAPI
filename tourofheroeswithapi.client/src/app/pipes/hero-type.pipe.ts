import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heroType'
})
export class HeroTypePipe implements PipeTransform {

  transform(value: string): string{
    if( value === 'strength') {
      return '💪'
    } else if( value === 'intelligence') {
      return '🧠'
    } else  if ( value === 'magic') {
      return  '✨'
    } else if (value === 'speed') {
      return '⚡'
    } else if ( value === 'technology') {
      return '🤖'
    } else {
      return '❓'
    }
  }

}
