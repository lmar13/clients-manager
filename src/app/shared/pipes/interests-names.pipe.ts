import { Pipe, PipeTransform } from '@angular/core';
import { Interest } from '../../models/interest.model';

@Pipe({ name: 'interestNames' })
export class InterestsNamesPipe implements PipeTransform {
  transform(interests: Interest[]): string {
    return interests.map(i => i.name).join(', ');
  }
}
