import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil} from 'rxjs';
import { LoginForm } from './form/login.form';
import { User } from 'src/app/core/domain/user.interface';
import { ModalService } from 'src/app/core/services/modal.service';
import { DataModal } from 'src/app/core/domain/data-modal';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as actions from '../../../core/state/actions/user.action';
import { selectUserFeatureState } from 'src/app/core/state/selectors/user.selector';
import { UserState } from 'src/app/core/state/features/user/user.feature';
import { messageErrorLogin, titleError } from 'src/app/core/constants/constants';
import { getMovies } from 'src/app/core/state/actions/movies.action';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  subscription$: Subscription;
  user: User | null = null;
  loginForm = new LoginForm();
  notifier$: Subject<any> = new Subject();

  constructor(
    private readonly store: Store,
    private readonly modalService: ModalService,
    private dialog: MatDialog,
    private router: Router
    ) {
    this.subscription$ = new Subscription();
  }

  ngOnInit(): void {
    this.susbscripcionFormChanges();
    this.subscriptionUser();
    this.openModal();
  }

  private subscriptionUser(){
    this.store.select(selectUserFeatureState)
      .pipe(takeUntil(this.notifier$))
      .subscribe((state: UserState) => {
        if(state.error){
          this.modalService.getModal(titleError, messageErrorLogin);
        }
        if(state.login && state.uid){
          localStorage.setItem('user', state.uid);
          this.store.dispatch(getMovies({ category: 'popular'}));
          this.router.navigate(['/movies/list']);
        }
      })
  }

  private susbscripcionFormChanges(){
    this.loginForm.valueChanges
      .pipe(takeUntil(this.notifier$))
      .subscribe((user: User) =>{
        this.user = cloneDeep(user);
      })
  }

  openModal(){
    this.subscription$ = this.modalService.newMessage$
      .pipe(takeUntil(this.notifier$))
      .subscribe((data: DataModal) => {
        if(data){
          const ref = this.dialog.open(ModalComponent, { data })
          ref.afterClosed().subscribe();
        }
    })
  }

  logIn() {
    if(this.loginForm.valid && this.user) {
      this.store.dispatch(actions.logInUser({user: this.user}));
    }
  }

  logInWithGoogle(){
    this.store.dispatch(actions.logInWithGoogle());
  }

  validateLogUser(){
    if(localStorage.getItem('user')){
      this.store.dispatch(getMovies({ category: 'popular'}));
      this.store.dispatch(actions.loadUser({ uid: localStorage.getItem('user')}));
    }
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

}
