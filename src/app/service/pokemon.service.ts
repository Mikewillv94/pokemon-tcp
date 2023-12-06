import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Card } from '../models/card.model';
import { Deck } from '../models/deck.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://api.pokemontcg.io/v1/cards';
  private apiKey = '9a823dce-631f-4b4f-aefb-94a824c62885';

  public listDeck:Deck[] = [];

  constructor(private http: HttpClient) { }

  getCards(): Observable<any[]> {
    const params = new HttpParams().set('apiKey', this.apiKey);

    return this.http.get<any[]>(this.apiUrl, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getDecks(): Deck[] {
    return this.listDeck;
  }

  addDeck(name: string, cards: Card[]): void {

    const ultimoId = this.listDeck.length > 0 ? this.listDeck[this.listDeck.length - 1].id : 0;
    const novoDeck = { id: ultimoId + 1, name, cards };
    this.listDeck.push(novoDeck);
  }

  editDeck(id: number, newName: string, newCards: Card[]): void {
    const index = this.listDeck.findIndex(deck => deck.id === id);

    if (index !== -1) {
      this.listDeck[index].name = newName;
      this.listDeck[index].cards = newCards;
    }
  }

  deleteDeck(id: number): void {
    const index = this.listDeck.findIndex(deck => deck.id === id);
    if (index !== -1) {
      this.listDeck.splice(index, 1)
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(`Código do erro: ${error.status}, ` + `mensagem: ${error.error.message}`);
    }
    return throwError(() => 'Algo deu errado; por favor, tente novamente mais tarde.');
  }
}