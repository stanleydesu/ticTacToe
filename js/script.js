"use strict";

const GAME  	 = {}, // model
	  BOARD 	 = {}, // view
	  CONTROLLER = {}, // controller
	  APP 		 = {}; // everything!

// CONTROLLER => GAME => BOARD

CONTROLLER.init = function() {
	document.getElementById('board').addEventListener('click', function(e) {
		GAME.addMove(e.target.id);
	});
}

GAME.init = function() {
	this.board = new Array(9).fill(NaN);
	this.currTurn = 'X';
	this.totalTurns = 0;
}

GAME.getPlayer = function() {
	return this.currTurn;
};

// adds the current player's move into their desired position
GAME.addMove = function(pos) {
	// if desired position on board is vacant
	if (!this.board[pos]) {
		++this.totalTurns;
		this.board[pos] = this.currTurn;
		this.currTurn = this.currTurn === 'X' ? 'O' : 'X';
		BOARD.update(this.board);

		let winner = this.getWinner(this.board);
		// check if game has ended
		if (winner || this.totalTurns === 9) {
			BOARD.endGame(this.board, winner);
			this.init();
			BOARD.init();
		}
	}
}

// returns an array containing winning coordinates and winner, else null
GAME.getWinner = function(b) {
	// check rows, columns and diagonals connected to centre square
	if (b[3] === b[4] && b[4] === b[5]) {
		return {coords: [3, 4, 5], winner: b[4]};
	} else if (b[1] === b[4] && b[4] === b[7]) {
		return {coords: [1, 4, 7], winner: b[4]};
	} else if (b[0] === b[4] && b[4] === b[8]) {
		return {coords: [0, 4, 8], winner: b[4]};
	} else if (b[2] === b[4] && b[4] === b[6]) {
		return {coords: [2, 4, 6], winner: b[4]};
	}
	// check rows, columns and diagonals connected to top-left square
	if (b[0] === b[1] && b[1] === b[2]) {
		return {coords: [0, 1, 2], winner: b[1]};
	} else if (b[0] === b[3] && b[3] === b[6]) {
		return {coords: [0, 3, 6], winner: b[3]};
	}
	// check rows, columns and diagonals connected to bottom-right square
	if (b[2] === b[5] && b[5] === b[8]) {
		return {coords: [2, 5, 8], winner: b[5]};
	} else if (b[6] === b[7] && b[7] === b[8]) {
		return {coords: [6, 7, 8], winner: b[7]};
	}
	return null;
}

BOARD.init = function() {
	this.array = document.querySelectorAll('.box');
}

// displays board to user
BOARD.update = function(b) {
	for (let i = 0; i < b.length; ++i) {
		this.array[i].textContent = b[i] || '';
	}
}

// displays the end game message
BOARD.endGame = function(b, winner) {
	if (winner) {
		// only display the winning boxes
		for (let i = 0; i < this.array.length; ++i) {
			if (winner.coords.indexOf(i) === -1) {
				this.array[i].textContent = '';
			}
		}
	} else {
		alert('draw');
	}
}

APP.init = function() {
	CONTROLLER.init();
	GAME.init();
	BOARD.init();
}

APP.init();