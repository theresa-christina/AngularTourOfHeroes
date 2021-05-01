import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

/** @Component is a decorator function that specifies the Angular metadata for the component */
/** component's CSS element selector (a CSS element selector selects all elements of a given type w/in a doc) */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  /** Retrieve heroes from the service */
  /** Waits for Observable to emit array of heroes, subscribe then passes array to the callback */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

/** When HeroesComponent is created, dependency injection system sets the heroService parameter to the singelton instance of HeroService */
  constructor(private heroService: HeroService) { }

/** ngOnInit is a lifecycle hook (function that gets called at specific points in a component's life),
 * good place to put initialization logic
 */
  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    /** When addHero() saves successfully, the subscribe() callback receives the new hero and pushes it into heroes list for display */
    this.heroService.addHero( { name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    /** heroService must delete the hero from it's own list as well */
    this.heroes = this.heroes.filter(h => h !== hero);

    /** Must subscribe (even though you don't do anything w/ the Observable) or else the service won't send delete request to the server */
    /** As a rule, an Observable does nothing until something subscribes */
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
