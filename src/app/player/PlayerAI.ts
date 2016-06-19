import PlayerInterface from "./PlayerInterface";
import GameStateInterface from "../GameStateInterface";
import PointInterface from "../PointInterface";

// import all available AI natures
import AINatureInterface from "./nature/AINatureInterface"; 
import AINatureRandom from "./nature/AINatureRandom";

const availableNatures:any = {
  random: AINatureRandom
};

export default class PlayerAI implements PlayerInterface{
  name: String;
  sign: String;
  nature: AINatureInterface;
  ai = true;

  constructor(name: String, sign: string, nature: string = "random") {
    this.name = name;
    this.sign = sign;

    if(availableNatures[nature]) {
      this.nature = new availableNatures[nature]();
    } else {
      this.nature = new AINatureRandom();
    }
  }

  takeTurn(gameState: GameStateInterface) {
    return this.nature.getNextMove(gameState);
  }
}