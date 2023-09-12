import { StoreModule } from "@ngrx/store";
import { userFeature } from "./user/user.feature";
import { movieFeature } from "./movies/movie.feature";

export const stateFeatures = [
  StoreModule.forFeature(userFeature),
  StoreModule.forFeature(movieFeature)
]
