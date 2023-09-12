import { MoviesEffects } from "./movies/movies.effects";
import { UserEffects } from "./user/user.effects";

export const appEffects: Array<any> = [
  UserEffects,
  MoviesEffects
]
