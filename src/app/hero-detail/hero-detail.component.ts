/** Hero property must be an input property b/c external HeroesComponent will bind to it */
/** This component receives a hero object and displays it only */
/** HeroComponent is the parent to HereDetailCompenent */
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
