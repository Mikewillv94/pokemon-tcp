import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Deck } from 'src/app/models/deck.model';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  styleUrls: ['./pack-list.component.scss']
})
export class PackListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'icons'];
  dataSource: MatTableDataSource<Deck>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private router: Router,
    private pokemonService: PokemonService
    ) {
    this.paginatorIntl.itemsPerPageLabel = 'Itens por página:';
    this.paginatorIntl.nextPageLabel = 'Próxima Página';
    this.paginatorIntl.previousPageLabel = 'Página Anterior';
    this.paginatorIntl.firstPageLabel = 'Primeira Página';
    this.paginatorIntl.lastPageLabel = 'Última Página';
    const decks = this.pokemonService.listDeck;
    this.dataSource = new MatTableDataSource(decks);
  }

  

  createDeck(){
    this.router.navigate(['/create'])
  }

  visibilityDeck(id: string){
    this.router.navigate(['/details', id])
  }



  editDeck(id: string){
    this.router.navigate(['/edit', id])
  }

  deleteDeck(id): void {
    this.pokemonService.deleteDeck(id);
    const timer = setInterval(() => {
      const decks = this.pokemonService.listDeck;
      this.dataSource = new MatTableDataSource(decks);
    }, 500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

