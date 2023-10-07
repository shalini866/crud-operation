import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit , AfterViewInit{
  @Input() productList: { name: string; id: number; price: number }[] = [];
  @Output() onSelected = new EventEmitter<any>();
  sessionId = Math.random();

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onSelectedProduct(product: any) {
    console.log(product);
    this.onSelected.emit(product);
  }

  // onSelectedProduct(product: any) {
  //   console.log(product);
  //   this.sessionId = Math.random(); 
  //   this.onSelected.emit(product);
  // }
} 
