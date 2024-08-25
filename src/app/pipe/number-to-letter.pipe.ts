import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'numberToLetter'
})
export class NumberToLetterPipe implements PipeTransform {
  transform(num: number): string {
    if (num < 0 || num > 25) return '';
    return String.fromCharCode(65 + num);
  }
}
