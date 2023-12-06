import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { PokemonService } from 'src/app/service/pokemon.service';
import { DialogService } from 'src/app/shared/dialog.service';



@Component({
  selector: 'app-pack-create',
  templateUrl: './pack-create.component.html',
  styleUrls: ['./pack-create.component.scss']
})
export class PackCreateComponent implements OnInit {

  cards: Card[] = [];
  deckForm: FormGroup;
  isFixed: boolean = false;


  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  @HostListener('window:scroll', [])
  onScroll(): void {
    console.log
    this.isFixed = window.pageYOffset > 70; // Ajuste o valor conforme necessário
  }

  constructor(
    private pokemonService: PokemonService, 
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private router: Router) {
    this.deckForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cards: this.formBuilder.array([], [Validators.minLength(1)])
    });
  }

  ngOnInit(): void {
    this.getPokemonCards()
  }

  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  getPokemonCards() {
    this.pokemonService.getCards().subscribe((data: any) => {
      this.cards = data.cards.map((cardData: any) => {
        const { id, name, types, supertype, imageUrl , imageUrlHiRes  } = cardData;
        return { id, name, types: types || [], supertype, imageUrl ,imageUrlHiRes };
      });
      console.log("dfgiwsipfsdfpij : ",this.cards )
    });
  }

  addCard(card: Card) {
    const cardsArray = this.deckForm.get('cards') as FormArray;
    if(cardsArray.length < 60){
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

  saveDeck(){
    if(this.deckForm.get('name').valid ){
      if(this.deckForm.get('cards').value.length > 23){
        this.openDialog('Deseja Salvar ?');
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
        await this.pokemonService.addDeck(this.deckForm.value.name, this.deckForm.value.cards)
        await this.back();
      }
    });
  }

  openAlert(message): void {
    this.dialogService.openAlertDialog(message).subscribe(result => {});
  }

  back(){
    this.router.navigateByUrl('/list')
  }


}
