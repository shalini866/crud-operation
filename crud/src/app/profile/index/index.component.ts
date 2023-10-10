import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';

interface Person {
  name: string;
  age: number;
  // d : string
  // x : number
  // y: string
  // z : number
}

    // enums
    enum StatusCodes {
      NotFound = 200,
      Success = 200,
      Accepted = 200,
      BadRequest = "Bad Request"
    };
    
    console.log('StatusCodes',StatusCodes.NotFound);
    
    console.log('StatusCodes',StatusCodes.Success);

    console.log('StatusCodes',StatusCodes.BadRequest);   
    
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})



export class IndexComponent implements OnInit {
  // @ViewChild('productListComponent', { static: false }) productList: ProductListComponent | any;   
  // selectedProduct: any;
  CData: any;
  id: any;

people: Person[] =[
  { name: "AAA",age: 20},
  { name: "Bb", age: 32 },
  { name: "CC", age: 22 },
  { name: "Dd", age: 35 },
];

// people : Person ={
//   name: "AAA",age: 20,
//   d: "Bb", x: 32,
//   y: "CC", z: 22 ,
// }

youngPeople: Person[] =[];
oldPeople: Person[] = [];


  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.dataService.childData$.subscribe((data) => {
      console.log('data', data);
      this.CData = data;
      console.log('this.Cdata', this.CData);

    });


  }


  ngOnInit() {
    const dynamicId = '123';
    this.navigateToProfileWithId(dynamicId);
    console.log('navigateToProfileWithId', this.navigateToProfileWithId);
    this.partitionPeople();
  }


  
  partitionPeople() {
    [this.youngPeople, this.oldPeople] = this.partitionArray(this.people, (person) => person.age < 30);

    console.log("Young people:", this.youngPeople);
    console.log("Old people:", this.oldPeople);
  }

  partitionArray<T>(array: T[], condition: (item: T) => boolean): [T[], T[]] {
// array, which is an array of type T.
// condition, which is a function that takes an item of type T and returns a boolean value.

    const trueItems: T[] = [];
    const falseItems: T[] = [];

    for (const item of array) {
      if (condition(item)) {
        trueItems.push(item);
      } else {
        falseItems.push(item);
      }
    }

    return [trueItems, falseItems];
  }


  private navigateToProfileWithId(id: string) {
    this.router.navigate(['/profile/index', id]);
  }

  onParentInputChange(value: any) {
    this.dataService.updateParentData(value);

  }

  complete() {
    this.dataService.completeObservable();
  }

  errorObservable(value: any) {
    this.dataService.errorObservable(value);
  }


}
