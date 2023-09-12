import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie, ResponseApi } from '../domain/movies.interface';
import { Observable } from 'rxjs';
import { urlBase, urlEnd } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private readonly http: HttpClient) { }

  getMovies(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${urlBase}movie/popular${urlEnd}`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${urlBase}movie/${id}${urlEnd}`)
  }

  getByName(name: string): Observable<ResponseApi>{
    const httpOptions = {
      params: new HttpParams().set('query', name)
    };
    return this.http.get<ResponseApi>(`${urlBase}search/movie${urlEnd}`, httpOptions);
  }

  getMoviePage(page: number): Observable<ResponseApi>{
    const httpOptions = {
      params: new HttpParams().set('page', page)
    };
    return this.http.get<ResponseApi>(`${urlBase}movie/popular${urlEnd}`, httpOptions);
  }
}
