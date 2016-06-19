import { Component } from "@angular/core";
import "../../public/css/styles.css";
import InputComponent from "./input/InputComponent.ts";
import GameInfoComponent from "./GameInfoComponent.ts";

import GameState from "./GameState.ts";
import PlayerInterface from "./player/PlayerInterface.ts";
import PlayerAI from "./player/PlayerAI.ts";
import PlayerHuman from "./player/PlayerHuman.ts";

@Component({
  selector: "tic-ai-toe",
  template: require("./GameComponent.html"),
  styles: [require("./GameComponent.css")],
  directives: [InputComponent, GameInfoComponent]
})

export default class GameComponent {
  state: GameState;
  players: Array<PlayerInterface>;
  currentPlayer: PlayerInterface;
  db: any;
  dbName: String = 'moves';

  constructor() {
    let turn = 1;
    let fdb: any = new ForerunnerDB();

    this.resetData();

		this.db = fdb.db('tic-ai-toe');
		this.db.collection(this.dbName).load();
  }

  resetData() {
    this.state = new GameState();
    this.state.addPlayer(new PlayerHuman("human", "x"));
    this.state.addPlayer(new PlayerAI("skynet", "o"));
    this.currentPlayer = this.state.getThisTurnsPlayer();
  }

  restartGame() {
    this.resetData();
  }

  changeState(event: any) {
    if(this.state.getGameStatus() !== 0) {
      return;
    }

    // perform move
    this.state.applyPlayerMove(event.x, event.y);
    this.state.updateGameStatus();

    // if we're still playing - it's next players move
    if(this.state.getGameStatus() === 0) {
      this.state.nextTurn();
      this.currentPlayer = this.state.getThisTurnsPlayer();

      if(this.currentPlayer.ai === true) {
        window.setTimeout(() => {
          this.changeState(this.currentPlayer.takeTurn(this.state));
        }, 1000)
      }
    }

    // save state
    // Add the new item to ForerunnerDB's todo collection
    // this.db.collection(this.dbName).insert({
    //   id:
    //   text: itemText
    // });

    // Now we've added the item to the collection, tell
    // forerunner to persist the data
    // this.db.collection(this.dbName).save();
  }
}
