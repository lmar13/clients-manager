import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'interestNames' })
export class InterestsNamesPipe implements PipeTransform {
  transform(interests: string[]): string {
    return interests.join(', ');
  }
}
