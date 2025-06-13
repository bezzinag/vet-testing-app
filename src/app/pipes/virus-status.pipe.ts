import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'virusStatus'
})
export class VirusStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
