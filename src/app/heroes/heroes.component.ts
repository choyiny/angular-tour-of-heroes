import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

// Mock data no longer required directly in components, use HeroService instead
// import { HEROES } from '../mock-heroes';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // hero: Hero = { id: 1, name: 'Windstorm' };

  heroes: Hero[];

  selectedHero: Hero;

  // on selecting a hero
  // input: hero
  // output: void
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // constructor for the heroes component
  // Angular sets this.heroService as a singleton instance of HeroService
  constructor(private heroService: HeroService) { }

  // synchronous version of getHeroes()
  // NOTE: will not work in real server
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  // asynchronous version of getHeroes()
  // waits for HeroService.getHeroes() to emit the heroes array,
  // .subscribe() passes the array to the callback
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  // click listener for heroes component
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero( { name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // delete existing hero
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  // called when the component is initialized
  ngOnInit() {
    this.getHeroes();
  }

}
