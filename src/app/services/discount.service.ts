import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  getDiscountPercentage(price: number, discountPrice: number | undefined) {
    if (discountPrice)
      return Math.round(100 - (discountPrice / price) * 100);

    return price;
  }
}
