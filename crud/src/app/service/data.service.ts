import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private parentDataSubject = new BehaviorSubject<any>(null);
  parentData$: Observable<any> = this.parentDataSubject.asObservable();

  private childDataSubject = new BehaviorSubject<any>(null);
  childData$: Observable<any> = this.childDataSubject.asObservable();

  updateParentData(data: any) {
    this.parentDataSubject.next(data);
  }

  updateChildData(data: any) {
    this.childDataSubject.next(data);
  }
  constructor(){}

}