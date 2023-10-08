import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit ,AfterViewInit {
  // @ViewChild('productListComponent', { static: false }) productList: ProductListComponent | any;   
  // selectedProduct: any;

  CData: any;
  id: any;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.dataService.childData$.subscribe((data) => {
      this.CData = data;
    });
  }

  ngOnInit() {
    const dynamicId = '123';
    this.navigateToProfileWithId(dynamicId);
    console.log('navigateToProfileWithId',this.navigateToProfileWithId);
    
  }
  
  onParentInputChange(value: any) {
    this.dataService.updateParentData(value);
  }

  private navigateToProfileWithId(id: string) {
    this.router.navigate(['/profile/index', id]);
  }
  ngAfterViewInit(): void {
    // if (this.productList) {
    //   const sessionId = this.productList.sessionId;
    //   console.log('Session ID from ProductListComponent:', sessionId);
    // }
  }




  // products = [
  //   { name: 'Rice', id: 1, price: 200 },
  //   { name: 'Beans', id: 2, price: 300 },
  //   { name: 'Bananna', id: 3, price: 400 },
  // ];
  // onSelectedProduct(product: any) {
  //   this.selectedProduct = product;
  // }
}
