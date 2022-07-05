import { Client } from "src/app/client/model/Client";
import { Game } from "src/app/game/model/Game";

export class Loan {
  id: number;
  game: Game;
  client: Client;
  startDate: Date;
  endDate: Date;

  constructor(id: number, game: Game, client: Client, startDate: Date, endDate: Date) {
    this.id = id;
    this.game = game;
    this.client = client;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
