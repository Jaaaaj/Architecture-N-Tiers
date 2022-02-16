import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarousselComponent } from './components/caroussel/caroussel.component';
import {UploadImagesComponent} from './components/upload-images/upload-images.component';
const routes: Routes = [
  { path: 'upload', component: UploadImagesComponent },
  { path: 'watch', component: CarousselComponent },
  { path: '', redirectTo: 'upload', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
