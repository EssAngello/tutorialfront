import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';
import { LOAN_DATA } from './model/mock-loans';
import {Author} from "../author/model/Author";
import {HttpClient} from "@angular/common/http";
import {AuthorPage} from "../author/model/AuthorPage";
import {Client} from "../client/model/Client";
import {Game} from "../game/model/Game";

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getLoans(pageable: Pageable, gameId?: number, clientId?: number, date?: String): Observable<LoanPage> {
    return this.http.post<LoanPage>(this.composeFindUrl(gameId, clientId, date), {pageable:pageable});
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>('http://localhost:8080/loan');
  }

  saveLoan(loan: Loan): Observable<Loan> {
    let url = 'http://localhost:8080/loan';

    if (loan.id != null) {
      url += '/'+loan.id;
    }

    return this.http.put<Loan>(url, loan);
  }

  deleteLoan(idLoan : number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/loan/'+idLoan);
  }


  private composeFindUrl(gameId?: number, clientId?: number, date?: String) : string {
    let params = '';

    if (gameId != null) {
      params += 'idGame='+gameId;
    }

    if (clientId != null) {
      if (params != '') params += "&";
      params += "idClient="+clientId;
    }

    if (date != null) {
      if (params != '') params += "&";
      params += "date="+date;
    }

    let url = 'http://localhost:8080/loan'

    if (params == '') return url;
    else return url + '?'+params;
  }
}
