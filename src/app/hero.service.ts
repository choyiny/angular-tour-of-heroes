import { Injectable } from '@angular/core';

// Observable imports
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// local imports
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// HTTP Related
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


// messenger import
import { MessageService } from './message.service';


// HTTP options
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  // definitions
  private heroesUrl = "api/heroes"

  // service-in-service: inject MessageService into HeroService to serve
  // messages when loading of heroes is complete
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // synchronous version of getHeroes()
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // GET heroes from server
  // asynchronous version of getHeroes() that returns an Observable
  getHeroes(): Observable<Hero[]> {
    // http.get returns untyped json object
    // optional type specifier <Hero[]> gives a typed result object
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        // tap is when observable `suceeds`
        tap(heroes => this.log("fetched heroes")),
        // catcherror intercepts an Observable that `failed`
        // handleError returns [] for function
        catchError(this.handleError('getHeroes', []))
      );
  }

  // getting only 1 hero from service
  // getHero(id: number): Observable<Hero> {
  //   this.log(`fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  // GET hero by id, 404 if not found
  getHero(id: number): Observable<Hero> {
    // constructs request url with desired hero id
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // PUT update hero
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // POST create new hero
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // DELETE existing hero
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === "number" ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  };

  // log HeroService message with MessageService
  private log(message: string) {
    this.messageService.add("HeroService: " + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
