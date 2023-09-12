import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, takeUntil} from 'rxjs';
import { RegisterForm } from './form/register.form';
import { User } from 'src/app/core/domain/user.interface';
import { Store } from '@ngrx/store';
import * as actions from '../../../core/state/actions/user.action';
import { ModalService } from 'src/app/core/services/modal.service';
import { selectUserFeatureState } from 'src/app/core/state/selectors/user.selector';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { DataModal } from 'src/app/core/domain/data-modal';
import { UserState } from 'src/app/core/state/features/user/user.feature';
import { messageError, messageSuccess, titleError, titleSuccess } from 'src/app/core/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements  OnInit, OnDestroy {

  subscription$: Subscription;
  user: User | null = null;
  registerForm = new RegisterForm();
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
    this.subscripcionFormChanges();
    this.subscriptionUser();
    this.openModal();
  }

  private subscripcionFormChanges(){
    this.registerForm.valueChanges
      .pipe(takeUntil(this.notifier$))
      .subscribe((user: User) =>{
        this.user = user;
      })
  }

  private subscriptionUser(){
    this.store.select(selectUserFeatureState)
      .pipe(takeUntil(this.notifier$))
      .subscribe((state: UserState) => {
        if(state.error){
          this.modalService.getModal(titleError, messageError);
        }
        if(state.register){
          this.modalService.getModal(titleSuccess, messageSuccess);
        }
      })
  }

  createUser(){
    if(this.registerForm.valid && this.user){
      this.store.dispatch(actions.createAccount({ user: this.user }));
    }
  }

  openModal(){
    this.subscription$ = this.modalService.newMessage$
      .pipe(takeUntil(this.notifier$))
      .subscribe((data: DataModal) => {
        if(data){
          const ref = this.dialog.open(ModalComponent, { data })
          ref.afterClosed().subscribe(result => {
            if(result && data.title !== 'Error'){
              this.registerForm.reset();
              this.router.navigate(['/auth/login']);
            }
          })
        }
    })
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

}
