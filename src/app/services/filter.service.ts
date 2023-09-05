import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private _filters: ReplaySubject<Filter[]> = new ReplaySubject<Filter[]>();
  filters: Signal<Filter[]> = toSignal(this._filters.asObservable(), {
    initialValue: [],
  });

  constructor() {
    this._filters.next([{ name: 'test', value: 'test' }]);
    console.log('filters initialized');

    setTimeout(() => {
      this._filters.next([
        { name: 'test', value: 'test' },
        { name: 'test2', value: 'test2' },
      ]);
      console.log('filters updated');
    }, 5000);
  }
}

export type Filter = {
  name: string;
  value: string;
};
