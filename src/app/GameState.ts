import PlayerInterface from "./player/PlayerInterface.ts";

export default class GameState{
  turn: number;
  fields: Array<Array<String>>;
  player: PlayerInterface;
  end: number;

  players: Array<PlayerInterface>;
  signMap: Object;

  constructor() {
    this.players = [];
    this.turn = 1;
    this.fields = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    this.signMap = {o: 0, x:1};
    this.end = 0; // game not ended
  }

  updateGameStatus() {
    const f = this.fields;

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
      this.end = 1; // win
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
      this.end = -1; // tie
    } else {
      this.end = 0; // game not ended
    }
  }

  // -1: tie, 0: O, 1: X  
  getWinner(currentSign: string) {
    let winner = -1;

    if(this.end === 1) {
      winner = this.signMap[currentSign];
    }

    return winner;
  }

  getGameStatus() {
    return this.end;
  }

  applyPlayerMove(x: number, y: number) {
    let player = this.getThisTurnsPlayer();
    this.fields[x][y] = player.sign;
  }

  addPlayer(player: PlayerInterface) {
    this.players.push(player);
  }

  getThisTurnsPlayer() {
    return this.players[ (this.turn - 1) % 2 ];
  }

  nextTurn() {
    this.turn++;
  }
}