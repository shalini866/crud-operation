import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements AfterViewInit {
  @ViewChild('productListComponent', { static: false }) productList: ProductListComponent | any; 
  
  selectedProduct: any;
  
  ngAfterViewInit(): void {
    if (this.productList) {
      const sessionId = this.productList.sessionId;
      console.log('Session ID from ProductListComponent:', sessionId);
    }
  }


 constructor(){

 }
  products = [
    { name: 'Rice', id: 1, price: 200 },
    { name: 'Beans', id: 2, price: 300 },
    { name: 'Bananna', id: 3, price: 400 },
  ];
  onSelectedProduct(product: any) {
    this.selectedProduct = product;
  }
}
