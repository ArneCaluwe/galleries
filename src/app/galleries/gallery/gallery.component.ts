import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, combineLatest, map, switchMap, tap } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';
import { GalleryItem, GalleryService } from 'src/app/services/gallery.service';

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
  data = toSignal(this.data$);

  favouritesCount$ = this.data$.pipe(map((d) => getFavouritesCount(d)));
}

function getFavouritesCount(data: GalleryItem[]): number {
  return data.reduce((acc: number, item) => {
    return item.isFavourite ? acc + 1 : acc;
  }, 0);
}
