import { Component, EventEmitter } from "@angular/core";

@Component({
  selector: "tic_ai_input",
  template: require("./InputComponent.html"),
  styles: [require("./InputComponent.css")],
  outputs: ["actionMade"],
  inputs: ["x", "y"]
})

export default class InputComponent {
  x: Number;
  y: Number;
  actionMade = new EventEmitter<any>();

  constructor() {
  }

  clicked(input: any) {
    this.actionMade.emit({
      input,
      x: this.x,
      y: this.y
    });
  }
}
