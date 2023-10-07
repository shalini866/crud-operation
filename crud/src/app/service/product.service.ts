import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();
  private productListBus$ = new BehaviorSubject<any>([]);
  productList$ = this.productListBus$.asObservable();


  setProduct(product: any) {
    this.product$.next(product);
  }

  setProductList(products: any) {
    this.productListBus$.next(products);
  }
  
  constructor() { }
}
