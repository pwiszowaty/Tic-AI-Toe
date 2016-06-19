import { Component, EventEmitter } from "@angular/core";

@Component({
  selector: "tic_ai_input",
  template: require("./InputComponent.html"),
  styles: [require("./InputComponent.css")],
  outputs: ["actionMade"],
  inputs: ["x", "y", "sign"]
})

export default class InputComponent {
  x: Number;
  y: Number;
  sign: String;
  actionMade = new EventEmitter<any>();

  clicked(input: any) {
    if(this.sign === "") {
      this.actionMade.emit({
        input,
        x: this.x,
        y: this.y
      });
    }
  }
}
