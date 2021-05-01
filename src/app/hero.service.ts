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

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'applications/json'})
  };

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

  /** handleError takes type parameter as each service method returns a different kind of Observable result */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** PUT: update hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updateHero`))
    );
  }

  /** POST add a new hero to the server - server generates new id for the hero which it returns to the caller */
  /** tap - looks at the Observable value and do something with it */
  /** catchError - throw error / call some function if you get an error */
  /** pipe - link operators together, combine multiple functions into a single function, runs them in a sequence */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log (`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE hero from server */
  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    /** returns immediately w/ empty array if there is no search term */
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap( x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`, []))
    );
  }

  constructor(private messageService: MessagesService, private http: HttpClient) { }
}






















