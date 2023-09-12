import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const loginGuard = () => {

  const router = inject(Router);

  if(localStorage.getItem('user')){
    return true
  }
  else {
    router.navigate(['/auth/login']);
    return false;
  }
}

export const logoutGuard = () => {

  const router = inject(Router);

  if(localStorage.getItem('user')){
    router.navigate(['/movies/list']);
    return false
  }
  else {
    return true;
  }
}
