import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const STORE_DEVTOOLS = [
  StoreDevtoolsModule.instrument({
    maxAge: 25
  })
];
