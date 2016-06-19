import { Component } from "@angular/core";
import GameStateInterface from "./GameStateInterface.ts";

@Component({
  selector: "tic_ai_info",
  template: require("./GameInfoComponent.html"),
  styles: [require("./GameInfoComponent.css")],
  inputs: ["gameState"]
})

export default class GameInfoComponent {
  gameState: GameStateInterface;
}
