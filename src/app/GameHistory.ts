import GameState from "./GameState.ts";
import {Http, Headers} from '@angular/http';

export default class GameHistory{
	states: Array<String>;
  winner: number;

  constructor() {
    this.states = [];
    this.winner = 0; //tie
  }

	addState(state: GameState) {
		this.states.push(state.fields.map(row => row.map(field => {
			if(field === "") {
				return ".";
			}
			return field;
		})).join());

		console.log('dodałem state, aktualny stan: ');
		console.log(this.states);
	}

	getFinalScore(winner: Number) {
		let states: Array<Object> = [];

		this.states.forEach(board => {
			states.push({board, winner})
		});

		return states;
	}

	private getAll() {

	}

	checkOdds() {

	}
}