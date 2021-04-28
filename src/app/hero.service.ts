/** Components shouldn't fetch/save data directly, should focus on presenting data */
/** Delegate data access to a service */

/** HeroService provides an injectible service and also has injected dependencies */
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

/** Must register w/ a provider b4 it can be injected into HeroesComponent */
/** Provider creates/delivers a service */
@Injectable({
  /** providing service @ root level means angular creates a single, */
  /** shared instance of HeroService and provides to any class that asks for it */
  providedIn: 'root'
})
export class HeroService {

  getHeroes(): Hero[] {
    return HEROES;
  }

  constructor() { }
}
