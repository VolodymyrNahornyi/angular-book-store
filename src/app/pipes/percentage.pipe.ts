import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
  standalone: true
})
export class PercentagePipe implements PipeTransform {

  transform(price: number, discountPrice: number): string {
    return (Math.round(100 - (discountPrice / price) * 100)) + '% Off';
  }
}
