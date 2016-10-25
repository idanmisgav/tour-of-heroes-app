import { AppSettings } from '../appSettings';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from '../types/hero';

@Injectable()
export class HeroService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

update(hero: Hero): Promise<Hero[]> {
  const url = `${this.heroesUrl}/${hero.id}`;
  return this.http
    .put(url, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Hero[])
    .catch(this.handleError);
}

create(name: string): Promise<Hero[]> {
  const url = `${AppSettings.API_ENDPOINT}hero/addNewHero`;
  return this.http
    .post(url, JSON.stringify({id: 0, name: name}), {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Hero[])
    .catch(this.handleError);
}

delete(id: number): Promise<Hero[]> {
  const url = `${AppSettings.API_ENDPOINT}hero/deleteHero/${id}`;
  return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(response => response.json() as Hero[])
    .catch(this.handleError);
}

  getHeroes(): Promise<Hero[]> {
    return this.http.get(AppSettings.API_ENDPOINT + 'hero/getheroes')
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
}

//   getHeroes2(): Promise<void> {
//     return this.http.get(AppSettings.API_ENDPOINT + 'product/getProducts')
//                .toPromise()
//                .then(function(response) {
//                  let a = response.json();
//                  console.log("success.............. finally!");
//                })  
//                .catch(this.handleError);
// }

  getHero(id: number): Promise<Hero> {
  return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.id === id));
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

}