import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { PokemonService } from 'src/app/service/pokemon.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-pack-edit',
  templateUrl: './pack-edit.component.html',
  styleUrls: ['./pack-edit.component.scss']
})
export class PackEditComponent implements OnInit {

  cards: Card[] = [];
  deckForm: FormGroup;
  isFixed: boolean = false;

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log
    this.isFixed = window.pageYOffset > 70; 
  }

  constructor(
    private pokemonService: PokemonService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.deckForm = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      cards: this.formBuilder.array([], [Validators.minLength(1)])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const id = params['id'];
      const decks = this.pokemonService.listDeck;
      const getDeck = await decks.filter(deck => deck.id == id)[0];
      await this.loadDeck(getDeck)
    });

    this.getPokemonCards()
  }

  async loadDeck(deck) {
    if (deck?.id) {
      this.deckForm.get('id').setValue(deck.id);
      this.deckForm.get('name').setValue(deck.name);
      const cardsFormArray = this.deckForm.get('cards') as FormArray;
      await cardsFormArray.clear();

      for await (let card of deck.cards ){
        cardsFormArray.push(this.formBuilder.group({
          id: [card.id, Validators.required],
          name: [card.name, Validators.required],
          types: [card.types, Validators.required],
          supertype: [card.supertype, Validators.required],
          imageUrl: [card.imageUrl, Validators.required],
          imageUrlHiRes: [card.imageUrlHiRes, Validators.required],
        }));
      }
    } else {
      this.back();
    }

  }

  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  getPokemonCards() {
    this.pokemonService.getCards().subscribe((data: any) => {
      this.cards = data.cards.map((cardData: any) => {
        const { id, name, types, supertype, imageUrl, imageUrlHiRes } = cardData;
        return { id, name, types: types || [], supertype, imageUrl, imageUrlHiRes };
      });
    });
  }

  addCard(card: Card) {
    const cardsArray = this.deckForm.get('cards') as FormArray;
    if (cardsArray.length < 60) {
      if (!this.cardLimit(card.name, 4)) {
        cardsArray.push(this.formBuilder.group({
          id: [card.id, Validators.required],
          name: [card.name, Validators.required],
          types: [card.types, Validators.required],
          supertype: [card.supertype, Validators.required],
          imageUrl: [card.imageUrl, Validators.required],
          imageUrlHiRes: [card.imageUrlHiRes, Validators.required],
        }));
      } else {
        this.openAlert('Só podem ter 4 cartas com o mesmo nome');
      }
    } else {
      this.openAlert('Quantidade máxima é de 60 cartas!');
    }
    this.scrollToBottom();
  }

  private cardLimit(cardName: string, limit: number): boolean {
    const cardsArray = this.deckForm.get('cards') as FormArray;

    // Contar o número de cartas com o mesmo nome no array
    const count = cardsArray.controls
      .map((control: AbstractControl) => control.get('name').value)
      .filter((name: string) => name === cardName)
      .length;

    return count >= limit;
  }

  removeCard(index: number) {
    const cards = this.deckForm.get('cards') as FormArray;
    cards.removeAt(index);
  }

  saveDeck() {
    if (this.deckForm.get('name').valid) {
      if (this.deckForm.get('cards').value.length > 23) {
        this.openDialog('Deseja Salvar a Edição ?');
      } else {
        this.openAlert('Baralho precisa ter 24 cartas no mínimo!');
      }
    } else {
      this.openAlert('Nome do baralho é obrigatório!');
    }
  }

  openDialog(message): void {
    this.dialogService.openConfirmDialog(message).subscribe(async result => {
      if (result === 'ok') {
        await this.pokemonService.editDeck(this.deckForm.value.id,this.deckForm.value.name, this.deckForm.value.cards)
        await this.back();
      }
    });
  }

  openAlert(message): void {
    this.dialogService.openAlertDialog(message).subscribe(result => { });
  }

  back() {
    this.router.navigateByUrl('/list')
  }

}
