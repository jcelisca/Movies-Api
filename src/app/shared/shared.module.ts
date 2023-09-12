import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from '../core/services/modal.service';
import { MaterialModule } from '../material/material.module';
import { CardMovieComponent } from './card-movie/card-movie.component';



@NgModule({
  declarations: [
    ModalComponent,
    CardMovieComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ModalComponent,
    CardMovieComponent
  ],
  providers: [
    ModalService
  ]
})
export class SharedModule { }
