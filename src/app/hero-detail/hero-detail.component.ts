import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // hero property with input decorator
  @Input() hero: Hero;

  constructor(
    // hold information about the route (:id parameter in routes)
    private route: ActivatedRoute,
    // gets hero data from remote server for display
    private heroService: HeroService,
    // interaction with the browser (support going back)
    private location: Location
  ) { }

  ngOnInit(): void {
    // get the hero
    this.getHero();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  getHero(): void {
    // retrieve :id from the url
    // + converts string to number
    const id = +this.route.snapshot.paramMap.get('id')
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
