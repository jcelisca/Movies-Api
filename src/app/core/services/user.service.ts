import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from '@angular/fire/auth';
import { User } from '../domain/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  register(user: User){
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  logIn(user: User){
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  logOut(){
    return signOut(this.auth);
  }

  lonInGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
