import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessagesService} from '../messages.service';

/** @Component is a decorator function that specifies the Angular metadata for the component */
/** component's CSS element selector (a CSS element selector selects all elements of a given type w/in a doc) */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  /** Click event handler */
  selectedHero?: Hero;
  heroes: Hero[] = [];

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messagesService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  /** Retrieve heroes from the service */
  /** Waits for Observable to emit array of heroes, subscribe then passes array to the callback */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

/** When HeroesComponent is created, dependency injection system sets the heroService parameter to the singelton instance of HeroService */
  constructor(private heroService: HeroService, private messagesService: MessagesService) { }

/** ngOnInit is a lifecycle hook (function that gets called at specific points in a component's life),
 * good place to put initialization logic
 */
  ngOnInit(): void {
    this.getHeroes();
  }

}
