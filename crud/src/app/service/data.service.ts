import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private parentDataSubject = new Subject<any>();
  parentData$: Observable<any> = this.parentDataSubject.asObservable();

  private childDataSubject = new BehaviorSubject<any>(null);
  childData$: Observable<any> = this.childDataSubject.asObservable();

  updateParentData(data: any) {
    this.parentDataSubject.next(data);
  }

  updateChildData(data: any) {
    this.childDataSubject.next(data);
  }


  completeObservable(){
    this.parentDataSubject.complete();
    // this.parentDataSubject = new BehaviorSubject<any>(null);


  }
  
  errorObservable(data:any){
    // this.parentDataSubject.error(data);
    // this.parentDataSubject = new BehaviorSubject<any>(null);
    this.parentDataSubject.error(data);

  }
 
  constructor(){}

}