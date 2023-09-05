import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GalleryItem, GalleryService } from 'src/app/services/gallery.service';
import { FilterService } from 'src/app/services/filter.service';
import { Observable, combineLatest, filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  private _route = inject(ActivatedRoute);
  private _galleryService = inject(GalleryService);
  private _filterService = inject(FilterService);

  galleryId$: Observable<string | null> = this._route.paramMap.pipe(
    map((p) => p.get('id')),
    tap((id) => console.log(`gallery id: ${id}`))
  );

  data$ = combineLatest([this.galleryId$, this._filterService.filters$]).pipe(
    switchMap(([id, filters]) =>
      this._galleryService.getGalleryItems(id, filters)
    )
  );

  favouritesCount$ = this.data$.pipe(map((d) => getFavouritesCount(d)));
}

function getFavouritesCount(data: GalleryItem[]): number {
  return data.reduce((acc: number, item) => {
    return item.isFavourite ? acc + 1 : acc;
  }, 0);
}
