import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, map, of } from 'rxjs';
import { CacheStore } from '../interfaces/cahce-store.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl = 'https://restcountries.com/v3.1';

  public cacheStore : CacheStore = {
    byCapital: {
      term: '',
      countries: [],
    },
    byCountry: {
      term: '',
      countries: [],
    },
    byRegion: {
      countries: [],
    },
  };

  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${alphaCode}`;
    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((_) => of(null))
    );
  }
  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);
  }
  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url);
  }
  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url);
  }
}
