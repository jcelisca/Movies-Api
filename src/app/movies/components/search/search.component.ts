import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Movie, ResponseApi } from 'src/app/core/domain/movies.interface';
import { getMovieByName } from 'src/app/core/state/actions/movies.action';
import { selectSearch } from 'src/app/core/state/selectors/movie.selector';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchInput = new FormControl('');
  movies: Movie[] = [];
  movie: Movie | null = null;

  notifier$: Subject<any> = new Subject();

  constructor(
    private readonly store: Store
  ){}

  ngOnInit(): void {
    this.subscriptionSearchMovie();
  }

  private subscriptionSearchMovie(){
    this.store.select(selectSearch)
    .pipe(takeUntil(this.notifier$))
    .subscribe((response: ResponseApi | null) => {
      if(response?.results){
        this.movies = cloneDeep(response.results)
      };
    })
  }

  searchMovie(){
    const value: string = this.searchInput.value || '';
    this.store.dispatch(getMovieByName({ name: value }));
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void {
    if ( !event.option.value ) {
      this.movie = null;
      return;
    }

    const movie: Movie = event.option.value;
    this.searchInput.setValue( movie.original_title );

    this.movie = cloneDeep(movie);
    console.log(movie);
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

}
