import GameStateInterface from "../GameStateInterface.ts";

interface PlayerInterface{
  name: String;
  sign: string;
  ai: Boolean;

  takeTurn(gameState: GameStateInterface): void;
}

export default PlayerInterface;