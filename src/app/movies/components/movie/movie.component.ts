import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/core/domain/movies.interface';
import { selectMovie } from 'src/app/core/state/selectors/movie.selector';
import { cloneDeep } from 'lodash';
import { urlImage } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movie: Movie | null = null;
  notifier$: Subject<any> = new Subject();

  constructor(
    private readonly store: Store,
    private readonly router: Router
  ){}

  ngOnInit(): void {
    this.subscriptionMovieSelected();
  }

  private subscriptionMovieSelected(){
    this.store.select(selectMovie)
      .pipe(takeUntil(this.notifier$))
      .subscribe((movie: Movie | null) => {
        if(movie){
          this.movie = cloneDeep(movie);
        }
      })
  }

  getImage(url: string | undefined){
    return urlImage+url;
  }

  goBack(){
    this.router.navigate(['/movies/list']);
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

}
