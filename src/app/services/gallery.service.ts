import { Injectable } from '@angular/core';
import { Filter } from './filter.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  getGalleryItems(
    id: string | null,
    filters: Array<Filter>
  ): Observable<GalleryItem[]> {
    console.log(
      `fetching galleries for ${id ?? 'all galeries'} with filters ${filters}}`
    );
    return of([
      { id: '1', name: 'test', isFavourite: false },
      { id: '2', name: 'test2', isFavourite: true },
    ]).pipe(map((d) => d.slice(0, filters.length)));
  }

  constructor() {}
}

export type GalleryItem = {
  id: string;
  name: string;
  isFavourite: boolean;
};
