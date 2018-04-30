import { Injectable } from '@angular/core';

// Observable imports
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// local imports
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// messenger import
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  // service-in-service: inject MessageService into HeroService to serve
  // messages when loading of heroes is complete
  constructor(private messageService: MessageService) { }

  // synchronous version of getHeroes()
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // asynchronous version of getHeroes() that returns an Observable
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    // of() - special function to return observable of the mock data
    return of(HEROES);
  }

}
