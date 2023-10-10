import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  // @Input() productList: { name: string; id: number; price: number }[] = [];
  // @Output() onSelected = new EventEmitter<any>();
  // sessionId = Math.random();
  // @Input() PData: number | any;
  // @Output() childEvent = new EventEmitter();
  
  PData: any;

  constructor(private dataService: DataService) {
    this.dataService.parentData$.subscribe(      (data) => {
      this.PData = data;
      console.log('data:', data);
    },
    (error) => {
      console.log('Error:', error);
    },
    () => {
      console.log('Observable complete');
    });
  }

  onChildInputChange(value: any) {
    this.dataService.updateChildData(value);
  }

  ngOnInit(): void {
    
  }

  // onChange(value: any) {
  //   this.childEvent.emit(value);
  // }


  // onSelectedProduct(product: any) {
  //   console.log(product);
  //   this.onSelected.emit(product);
  // }

  // onSelectedProduct(product: any) {
  //   console.log(product);
  //   this.sessionId = Math.random(); 
  //   this.onSelected.emit(product);
  // }


} 
