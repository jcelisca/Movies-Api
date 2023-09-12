import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/core/domain/movies.interface';
import { getMovieById } from 'src/app/core/state/actions/movies.action';
import { urlImage } from 'src/environments/environment';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css']
})
export class CardMovieComponent {

  constructor(
    private readonly store: Store,
    private readonly router: Router
  ){}

  @Input() movie: Movie | null = null;

  getImage(url: string | undefined){
    return urlImage+url;
  }

  getMovieById(id: number | undefined) {
    if(id){
      this.store.dispatch(getMovieById({ id }));
      this.router.navigate(['/movies', id]);
    }

  }
}
