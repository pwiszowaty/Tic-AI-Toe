import { Component } from "@angular/core";
import "../../public/css/styles.css";
import InputComponent from "./input/InputComponent.ts";
import GameInfoComponent from "./GameInfoComponent.ts";
import GameHistory from "./GameHistory.ts";

import GameState from "./GameState.ts";
import PlayerInterface from "./player/PlayerInterface.ts";
import PlayerAI from "./player/PlayerAI.ts";
import PlayerHuman from "./player/PlayerHuman.ts";
import {Http, Headers, HTTP_PROVIDERS} from '@angular/http';

@Component({
  selector: "tic-ai-toe",
  template: require("./GameComponent.html"),
  styles: [require("./GameComponent.css")],
  directives: [InputComponent, GameInfoComponent],
  viewProviders: [HTTP_PROVIDERS],
})

export default class GameComponent {
  state: GameState;
  players: Array<PlayerInterface>;
  currentPlayer: PlayerInterface;
  db: any;
  dbName: String = 'moves';
  errorMessage: String;
  gameHistory: GameHistory;

  constructor(public http: Http) {
    let turn = 1;

    this.gameHistory = new GameHistory();
    this.resetData();
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

    //add state to the game history 
    this.gameHistory.addState(this.state);

    // if we're still playing - it's next players move
    if(this.state.getGameStatus() === 0) {
      this.state.nextTurn();
      this.currentPlayer = this.state.getThisTurnsPlayer();

      if(this.currentPlayer.ai === true) {
        window.setTimeout(() => {
          this.changeState(this.currentPlayer.takeTurn(this.state));
        }, 1000)
      }
    } else {
      //save the result
      this.save();
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

	save() {
		let headers = new Headers();
    const states = this.gameHistory.getFinalScore(this.state.getWinner(this.currentPlayer.sign));
		
    headers.append('Content-Type', 'application/json');

    console.log('uwaga, sejwuję!');
    console.log(JSON.stringify({states}));

		this.http.post('http://localhost:1337/game/save', JSON.stringify({states}), {headers})
    .subscribe(
      data => console.log('data recieved: ' + data),
      error =>  this.errorMessage = <any>error,
      () => console.log('Saved! ' + this.errorMessage)
    );
	}
}
