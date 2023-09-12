import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getMovies } from './core/state/actions/movies.action';
import * as actions from './core/state/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private readonly store: Store){}

  title = 'reto-angularv2';

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.store.dispatch(getMovies({ category: 'popular'}));
      this.store.dispatch(actions.loadUser({ uid: localStorage.getItem('user')}));
    }
  }
}
