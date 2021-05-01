/** Components shouldn't fetch/save data directly, should focus on presenting data */
/** Delegate data access to a service */

/** HeroService provides an injectible service and also has injected dependencies */
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

/** Must register w/ a provider b4 it can be injected into HeroesComponent */
/** Provider creates/delivers a service */
@Injectable({
  /** providing service @ root level means angular creates a single, */
  /** shared instance of HeroService and provides to any class that asks for it */
  providedIn: 'root'
})
export class HeroService {

  /** Define heroesUrl of form :base/:collectionName where base is resource to which requests are made */
  /** and collectionName is heroes data object in in-memory-data-service.ts */
  private heroesUrl = 'api/heroes';

  /** Must have an asynchronous signature if retrieving data from a server */
  getHeroes(): Observable<Hero[]> {
    /** return HEROES; */
    /** const heroes = of(HEROES); */
    /** this.messageService.add('HeroService: fetched heroes'); */
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        /** taps into the flow of observable values and logs a message */
        tap(_ => this.log('fetched heroes')),
        /** Intercepts an Observable that failed & passes error to error handling function */
        catchError(this.handleError<Hero[]>('getHeores', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    /** const hero = HEROES.find(h => h.id === id) as Hero; */
    const url = `${this.heroesUrl}/${id}`;
    /** this.messageService.add(`HeroService: fetched hero id=${id}`); */
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  /** Lost a HeroService message w/ Message Service */
  private log(message: string) {
    this.messageService.add(`HeroService : ${message}`);
  }

  /** handleError takes type parameter as each service method returns a differenct kind of Observable result */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(private messageService: MessagesService, private http: HttpClient) { }
}
