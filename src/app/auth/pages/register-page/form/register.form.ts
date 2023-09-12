import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export class RegisterForm extends FormGroup {
  readonly email = this.get('correo') as FormControl;
  readonly password = this.get('contrasena') as FormControl;

  constructor(private readonly fb = new FormBuilder()){
    super(
      fb.group({
        correo: [null, { validators: [Validators.required], updateOn: 'blur'}],
        contrasena: [null, { validators: [Validators.required], updateOn: 'blur'}]
      }).controls
    )
  }
}
