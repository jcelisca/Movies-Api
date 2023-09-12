import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectResponse } from 'src/app/core/state/selectors/movie.selector';
import { Movie, ResponseApi } from 'src/app/core/domain/movies.interface';
import { cloneDeep } from 'lodash';
import { getMoviePage } from 'src/app/core/state/actions/movies.action';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit, OnDestroy{

  response: ResponseApi | null = null;
  movies: Movie[] | null = null;
  notifier$: Subject<any> = new Subject();

  constructor(
    private readonly store: Store
  ){}

  ngOnInit(): void {
    this.subscriptionMovies();
  }

  private subscriptionMovies() {
    this.store.select(selectResponse)
    .pipe(takeUntil(this.notifier$))
    .subscribe((response: ResponseApi | null)=> {
      if(response?.results){
        this.movies = cloneDeep(response.results);
        this.response = cloneDeep(response);
      }
    })
  }

  previousPage(){
    if(this.response?.page && this.response.page > 1){
      this.store.dispatch(getMoviePage({ page: this.response.page - 1}));
    }
  }

  nextPage(){
    if(
      this.response?.page &&
      this.response.page < this.response.total_pages){
        this.store.dispatch(getMoviePage({ page: this.response.page + 1}));
    }
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

}
