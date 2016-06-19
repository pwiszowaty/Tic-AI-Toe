import { Component } from "@angular/core";
import "../../public/css/styles.css";
import InputComponent from "./input/InputComponent.ts";
import GameInfoComponent from "./GameInfoComponent.ts";

import GameStateInterface from "./GameStateInterface.ts";
import PlayerInterface from "./player/PlayerInterface.ts";
import PlayerAI from "./player/PlayerAI.ts";
import PlayerHuman from "./player/PlayerHuman.ts";

@Component({
  selector: "tic-ai-toe",
  template: require("./GameComponent.html"),
  styles: [require("./GameComponent.css")],
  directives: [InputComponent, GameInfoComponent]
})

export class GameComponent {
  state: GameStateInterface;
  players: Array<PlayerInterface>;

  constructor() {
    let turn = 1;
    this.players = [
      new PlayerHuman("human", "x"),
      new PlayerAI("human", "o")
    ];

    this.state = {
      turn,
      fields: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      player: this.getThisTurnsPlayer(turn, this.players),
      end: 0
    };
  }

  getThisTurnsPlayer(turn: number, players: Array<PlayerInterface>) {
    return players[ (turn - 1) % 2 ];
  }

  getGameStatus(state: GameStateInterface) {
    const f = state.fields;
    if(
      (f[0][0] === f[0][1] && f[0][1] === f[0][2] && f[0][1] !== "")
      || (f[1][0] === f[1][1] && f[1][1] === f[1][2] && f[1][1] !== "")
      || (f[2][0] === f[2][1] && f[2][1] === f[2][2] && f[2][1] !== "")

      || (f[0][0] === f[1][0] && f[1][0] === f[2][0] && f[1][0] !== "")
      || (f[0][1] === f[1][1] && f[1][1] === f[2][1] && f[1][1] !== "")
      || (f[0][2] === f[1][2] && f[1][2] === f[2][2] && f[1][2] !== "")
      
      || (f[0][0] === f[1][1] && f[1][1] === f[2][2] && f[1][1] !== "")
      || (f[0][2] === f[1][1] && f[1][1] === f[2][0] && f[1][1] !== "")
    ) {
      console.log('aaa 1');
      return 1; // win
    } else if(
      f[0][0] !== ""
      && f[0][1] !== ""
      && f[0][2] !== ""

      && f[1][0] !== ""
      && f[1][1] !== ""
      && f[1][2] !== ""

      && f[2][0] !== ""
      && f[2][1] !== ""
      && f[2][2] !== ""
    ) {
      console.log('aaa -1');
      return -1; // tie
    } else {
      console.log('aaa 0');
      return 0; // game not ended
    }
  }

  changeState(event: any) {
    if(this.state.end !== 0) {
      return;
    }
    
    event.input.textContent = this.state.player.sign;
    this.state.fields[event.x][event.y] = this.state.player.sign;

    this.state.end = this.getGameStatus(this.state);

    // check win conditions
    if(this.state.end === 1) {
      return;
    } else if(this.state.end === -1) {
      return;
    }

    this.state.turn++;
    this.state.player = this.getThisTurnsPlayer(this.state.turn, this.players);
  }
}
