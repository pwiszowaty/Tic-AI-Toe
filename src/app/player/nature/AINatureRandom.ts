import GameStateInterface from "../../GameStateInterface";
import PointInterface from "../../PointInterface";
import AIInterface from "./AINatureInterface";

export default class AINatureRandom implements AIInterface{
  getNextMove(state: GameStateInterface): PointInterface {
    return this.getRandomField(this.getAvailableFields(state)); 
  }

  getAvailableFields(state: GameStateInterface) {
    let availableFields: Array<PointInterface> = [];

    for(let x = 0; x < state.fields.length; x++) {
      for(let y = 0; y < state.fields[x].length; y++) {
        if(state.fields[x][y] === "") {
          availableFields.push({x, y});
        }
      }
    }

    return availableFields;
  }

  getRandomField(fields: Array<PointInterface>) {
    return fields[Math.floor(Math.random()*fields.length)];
  }
}