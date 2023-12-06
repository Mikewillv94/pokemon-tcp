import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/models/card.model';
import { PokemonService } from 'src/app/service/pokemon.service';

let typeCounts: { [key: string]: number } = {
  Grass: 0,
  Fire: 0,
  Water: 0,
  Lightning: 0,
  Psychic: 0,
  Fighting: 0,
  Darkness: 0,
  Metal: 0,
  Fairy: 0
};

@Component({
  selector: 'app-pack-details',
  templateUrl: './pack-details.component.html',
  styleUrls: ['./pack-details.component.scss']
})
export class PackDetailsComponent implements OnInit {

  cards: Card[] = [];  
  typeCountsArray: [string, number][] = [];
  
  countPokemon: number;
  countTrainer: number;
  
  constructor(
    private pokemonService: PokemonService,  
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const id = params['id'];
      const decks = this.pokemonService.listDeck;
      const getDeck = await decks.filter(deck => deck.id == id)[0];
      await this.loadDeck(getDeck)
    });
  }

  async loadDeck(deck) {
    if (deck?.id) {
      this.cards = deck.cards;
      this.count(deck.cards);
      this.countSuperType(deck.cards);
    } else {
      this.back();
    }
  }

  async count(cards){
    typeCounts ={
      Grass: 0,
      Fire: 0,
      Water: 0,
      Lightning: 0,
      Psychic: 0,
      Fighting: 0,
      Darkness: 0,
      Metal: 0,
      Fairy: 0
    }
    await cards.forEach(card => {
      card.types.forEach(type => {
        if (typeCounts.hasOwnProperty(type)) {
          typeCounts[type]++;
        }
      });
    });
    this.typeCountsArray = Object.entries(typeCounts);    
  }

  countSuperType(cards){
    this.countPokemon = 0;
    this.countTrainer = 0;
    cards.forEach(objeto => {
      if (objeto.supertype === 'Trainer') {
        this.countTrainer++;
      } else if (objeto.supertype === 'Pokémon') {
        this.countPokemon++;
      }
    });
  }

  back(){
    this.router.navigateByUrl('/list')
  }
}
