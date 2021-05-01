import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  /** searchTerms is RxJS subject - both a source Observables and an Observable itself */
  /** can subscribe to it like any other Observable or push values to it by calling next(value) */
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300 ms after each keystroke before considering the term - you'll never make requests more frequently than 300 ms
      debounceTime(300),
      // ignore new term if same as previous
      distinctUntilChanged(),
      // switch to new search observable each time the term changes & call the search service
      // switchMap preserves original request order, return Observable only from most recent Http method call
      // prior calls are cancelled and discarded
      switchMap( (term: string) => this.heroService.searchHeroes(term) )
    );
  }

  // Push a search term into observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

}
