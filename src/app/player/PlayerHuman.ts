import PlayerInterface from "./PlayerInterface";
import GameStateInterface from "../GameStateInterface";

export default class PlayerAI implements PlayerInterface{
  name: String;
  sign: string;
  ai = false;

  constructor(name: String, sign: string) {
    this.name = name;
    this.sign = sign;
  }

  takeTurn(gameState: GameStateInterface) {

  }
}