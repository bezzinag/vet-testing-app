import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'virusStatus'
})
export class VirusStatusPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'REACTIVE' : 'NON-REACTIVE';
  }

}
