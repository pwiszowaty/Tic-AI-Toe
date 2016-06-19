import PointInterface from "../../PointInterface";
import GameStateInterface from "../../GameStateInterface";

interface AINatureInterface {
  getNextMove(state: GameStateInterface): PointInterface
}

export default AINatureInterface;