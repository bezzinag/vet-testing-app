import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'virusStatus'})

// Pipes notes*
// A pipe in Angular is a simple way to transform data in templates.
// can be used to format, filter, or manipulate data before displaying it in the view.
// Pipes are defined using the @Pipe decorator and implement the PipeTransform interface.
// in this case we are creating a custom pipe named 'virusStatus' that transforms a boolean value into a string representation of the virus status.

export class VirusStatusPipe implements PipeTransform 
{

  transform(value: boolean): string {return value ? 'REACTIVE' : 'NON-REACTIVE';}

}
