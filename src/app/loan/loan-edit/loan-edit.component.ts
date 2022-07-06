import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/client/model/Client';
import { Game } from 'src/app/game/model/Game';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

  // @ts-ignore
  loan : Loan;

  // @ts-ignore
  maxDate: Date;

  clients: Client[] = [
    {id: 1, name: 'Cliente 1'},
    {id: 2, name: 'Cliente 2'},
    {id: 3, name: 'Cliente 3'},
  ];

  games: Game[] = [
    { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } },
    { id: 2, title: 'Juego 2', age: 8, category: { id: 1, name: 'Categoría 1' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } },
    { id: 3, title: 'Juego 3', age: 4, category: { id: 1, name: 'Categoría 1' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } },
    { id: 4, title: 'Juego 4', age: 10, category: { id: 2, name: 'Categoría 2' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } },
    { id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } },
    { id: 6, title: 'Juego 6', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } },
    { id: 7, title: 'Juego 7', age: 12, category: { id: 3, name: 'Categoría 3' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } },
    { id: 8, title: 'Juego 8', age: 14, category: { id: 3, name: 'Categoría 3' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } },
  ];

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    if (this.data.loan != null) {
      this.loan = Object.assign({}, this.data.loan);
      this.clients = Object.assign([], this.data.clients);
      this.games = Object.assign([], this.data.games);
      this.loan.startDate = new Date(this.loan.startDate);
      this.loan.endDate = new Date(this.loan.endDate);
      this.maxDate = new Date(this.loan.startDate);
      this.maxDate.setDate(this.maxDate.getDate()+14);
    }
    else {
      // @ts-ignore
      this.loan = new Loan();
      this.clients = Object.assign([], this.data.clients);
      this.games = Object.assign([], this.data.games);
    }
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe(result =>  {
      this.dialogRef.close();
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onChangeDate() {
    this.maxDate = new Date(this.loan.startDate);
    this.maxDate.setDate(this.maxDate.getDate()+14);
    if(this.loan.startDate.getDate()>=this.loan.endDate.getDate())
      this.loan.endDate = new Date(this.maxDate);
    if(this.loan.endDate.getDate()>this.loan.startDate.getDate()+14)
      this.loan.endDate = new Date(this.maxDate);
  }

  onChangeSelectionClient(client:any){
    this.loan.client = client;
  }

  onChangeSelectionGame(game:any){
    this.loan.game = game;
  }

}

