import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
interface pokeListResponse {
  create: string
  modified: string,
  name: string,
  pokemon: any[],
  resource_uri: string
}
@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private url = 'https://dev.treinaweb.com.br/pokeapi';
  pokeList = [];

  constructor(
    private http: HttpClient
  ) { }
  async listAll() {
    const x = await this.http.get<pokeListResponse>(`${this.url}/pokedex/1`).toPromise();


    x.pokemon.map(p => {
      p.number = this.getNumberFromUrl(p.resource_uri);
    });
    this.pokeList = this.sortPokemon(x.pokemon)
      // .filter(pokemon => pokemon.number < 1000);


    // this.http.get<pokeListResponse>(`${this.url}/pokedex/1`)
    //   .subscribe(x =>
    //     x.pokemon.forEach(p => {

    //     }
    //     )
    //   )
  }
  private getNumberFromUrl(url) {
    return parseInt(url.replace(/.*\/(\d+)\/$/, '$1'))
  }
  private sortPokemon(pokemonList) {
    return pokemonList.sort((a, b) => a.number - b.number);

  }
}
