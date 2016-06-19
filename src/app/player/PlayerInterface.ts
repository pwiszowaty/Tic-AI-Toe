import GameStateInterface from "../GameStateInterface.ts";

interface Player{
  name: String;
  sign: String;

  takeTurn(gameState: GameStateInterface): void;
}

export default Player;