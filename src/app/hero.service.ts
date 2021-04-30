/** Components shouldn't fetch/save data directly, should focus on presenting data */
/** Delegate data access to a service */

/** HeroService provides an injectible service and also has injected dependencies */
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';

/** Must register w/ a provider b4 it can be injected into HeroesComponent */
/** Provider creates/delivers a service */
@Injectable({
  /** providing service @ root level means angular creates a single, */
  /** shared instance of HeroService and provides to any class that asks for it */
  providedIn: 'root'
})
export class HeroService {

  /** Must have an asynchronous signature if retrieving data from a server */
  getHeroes(): Observable<Hero[]> {
    /** return HEROES; */
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id) as Hero;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);

  }

  constructor(private messageService: MessagesService) { }
}
