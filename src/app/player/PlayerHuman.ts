import PlayerInterface from "./PlayerInterface";
import GameStateInterface from "../GameStateInterface";

export default class PlayerAI implements PlayerInterface{
  name: String;
  sign: String;

  constructor(name: String, sign: String) {
    this.name = name;
    this.sign = sign;
  }

  takeTurn(gameState: GameStateInterface) {

  }
}