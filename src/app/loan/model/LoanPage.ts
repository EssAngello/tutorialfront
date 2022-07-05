import {Pageable} from "src/app/core/model/page/Pageable";
import {Loan} from "./Loan";

export class LoanPage{
  content: Loan[];
  pageable: Pageable;
  totalElements: number;

  constructor(content: Loan[], pageable: Pageable, totalElements: number) {
    this.content = content;
    this.pageable = pageable;
    this.totalElements = totalElements;
  }
}
