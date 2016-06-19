import PlayerInterface from "./player/PlayerInterface";

interface GameStateInterface{
  turn: number;
  fields: Array<Array<String>>;
  player: PlayerInterface;
  end: number;
}

export default GameStateInterface;