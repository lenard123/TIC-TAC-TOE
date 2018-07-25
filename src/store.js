let store = {
	state: {
		//GAME MODES
		modes: ['A.I. (Easy)', 'A.I. (Hard)', '2 Player'],
		mode: 0, //default AI EASY
		
		players: ['Player 1', 'Player 2', 'A.I.'], //PLAYERS

		//MOVES
		moves: ['X', 'O'],
		move: 0, //default X

		logs: []
	},

	mutations: {
		player1: function(state, name) {
			state.players.splice(0, 1, name)
		},

		mode: function(state, mode) {
			state.mode = mode
		},

		newgame: function(state) {
			state.logs.push([])
		},

		addLogs: function(state, logs) {
			state.logs[state.logs.length-1].push(logs)
		},

		switchMove: function(state) {
			if (state.move == 0)
				state.move = 1
			else
				state.move = 0
		}
	}
}

export default store