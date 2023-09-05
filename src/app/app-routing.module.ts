import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './galleries/gallery/gallery.component';

const routes: Routes = [{ path: 'galleries/:id', component: GalleryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes), GalleryComponent],
  exports: [RouterModule],
})
export class AppRoutingModule {}
