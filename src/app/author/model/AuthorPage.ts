import { Pageable } from "src/app/core/model/page/Pageable";
import { Author } from "./Author";

export class AuthorPage {
  content: Author[];
  pageable: Pageable;
  totalElements: number;

  constructor(content: Author[], pageable: Pageable, totalElements: number) {
    this.content = content;
    this.pageable = pageable;
    this.totalElements = totalElements;
  }
}
