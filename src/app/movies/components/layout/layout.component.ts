import { Component, OnDestroy, OnInit } from '@angular/core';
import * as actions from '../../../core/state/actions/user.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { selectUserFeatureState } from 'src/app/core/state/selectors/user.selector';
import { UserState } from 'src/app/core/state/features/user/user.feature';
import { getMovies } from 'src/app/core/state/actions/movies.action';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  pressButton = false;
  notifier$: Subject<any> = new Subject();

  constructor(
    private readonly store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptionUser();
  }

  private subscriptionUser(){
    this.store.select(selectUserFeatureState)
      .pipe(takeUntil(this.notifier$))
      .subscribe((state: UserState) => {
        if(!state.login && !state.uid && this.pressButton){
          localStorage.clear();
          this.router.navigate(['/auth/login']);
        }
      })
  }

  logOut() {
    this.pressButton = true;
    this.store.dispatch(actions.logOut());
  }

  findByCategory(category: string){
    this.store.dispatch(getMovies({ category }));
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

}
