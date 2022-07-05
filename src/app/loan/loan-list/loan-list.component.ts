import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/client/model/Client';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { Game } from 'src/app/game/model/Game';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import {ClientService} from "../../client/client.service";
import {GameService} from "../../game/game.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'endDate', 'action'];

  // @ts-ignore
  clients : Client[];

  // @ts-ignore
  games : Game[];

  // @ts-ignore
  filterClient: Client;

  // @ts-ignore
  filterGame: Game;

  // @ts-ignore
  filterDate: Date;

  datePipe : DatePipe = new DatePipe('es-ES');

  constructor(
    private clientService: ClientService,
    private loanService: LoanService,
    private gameService: GameService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable : Pageable =  {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(pageable).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

    this.clientService.getClients().subscribe(data => {this.clients=data})

    this.gameService.getGames().subscribe(data => {this.games=data})

  }

  onCleanFilter(): void {
    // @ts-ignore
    this.filterGame = null;
    // @ts-ignore
    this.filterClient = null;
    // @ts-ignore
    this.filterDate = null;

    this.onSearch();
  }

  onSearch(): void {

    let date = this.filterDate != null ? this.filterDate : null;

    // @ts-ignore
    date = this.datePipe.transform(date,'yyyy-MM-dd');

    let clientId = this.filterClient != null ? this.filterClient.id : null;
    let gameId = this.filterGame != null ? this.filterGame.id : null;

    let pageable : Pageable =  {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }
    // @ts-ignore
    this.loanService.getLoans(pageable, gameId, clientId, date).subscribe(
      data => {this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;}
    );
  }

  createLoan(clients:Client[], games:Game[]) {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {clients: clients, games:games}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editLoan(loan: Loan, clients:Client[], games:Game[]) {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: { loan: loan, clients: clients, games:games }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(result =>  {
          this.ngOnInit();
        });
      }
    });
  }
}
