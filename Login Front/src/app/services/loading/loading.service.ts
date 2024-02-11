import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  set changeLoading(data: boolean){
    this.loading.next(data);
  }

  get getLoading(){
    return this.loading.asObservable();
  }
}
