let store = {
	state: {
		//GAME MODES
		modes: ['A.I. (Easy)', 'A.I. (Hard)', '2 Player'],
		mode: 0, //default AI EASY
		
		players: ['Player 1', 'Player 2', 'A.I.'], //PLAYERS

		//MOVES
		moves: ['X', 'O', ''],
		move: 0, //default X

		logs: [],

		scores: [0, 0, 0], //SCORES,

		cells: [2, 2, 2, 2, 2, 2, 2, 2, 2]
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

		updateCell: function(state, cell) {
			state.cells.splice(cell[0], 1, cell[1])
		},

		resetCell: function(state) {
			state.cells.splice(0, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2)
		},

		resetScore: function(state) {
			state.scores.splice(0, 3, 0, 0, 0)
		},

		addLogs: function(state, logs) {
			state.logs[state.logs.length-1].push(logs)
		},

		clearLogs: function(state, logs) {
			state.logs = []
		},

		switchMove: function(state, move) {

			if (move !== undefined)
				state.move = move
			else if (state.move == 0)
				state.move = 1
			else
				state.move = 0
		},

		incrementScore: function(state, i) {
			let score = state.scores[i]
			state.scores.splice(i, 1, ++score)
		}
	},

	actions: {
		resetGame: function(context) {
			context.commit('resetScore')
			context.commit('resetCell')
			context.commit('clearLogs')
			context.commit('switchMove', 0)
		}
	}
}

export default store