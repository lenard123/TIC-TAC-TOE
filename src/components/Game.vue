<template>
<div class="container">
	<l-header>{{ modes[mode] }}</l-header>

	<div class="row">
		<center class="col-md-6">
			<h1>{{ players[turn] }} Turn</h1>

			<table class="game-table">			
				<tr>
					<cell :id="0"></cell>
					<cell :id="1"></cell>
					<cell :id="2"></cell>
				</tr>
				<tr>
					<cell :id="3"></cell>
					<cell :id="4"></cell>
					<cell :id="5"></cell>
				</tr>
				<tr>
					<cell :id="6"></cell>
					<cell :id="7"></cell>
					<cell :id="8"></cell>
				</tr>
			</table>

		</center>

		<div class="col-md-6">
			<h4>Scores</h4>
			<ul style="list-style-type: none;">
				<li v-for="(player, i) in players" v-if="isPlayer(i)">
					<b>{{ player }}: </b>{{ scores[i] }}
				</li>
			</ul>
		</div>

	</div>

	<modal name="gameover" :dismissable="false">
		<div class="modal-header">GAME OVER!!!</div>
		<div class="modal-body"><center><h1>{{ getWinner().message }}</h1></center></div>
		<div class="modal-footer">
			<div class="button-group">
				<button class="button" style="border-color:lime" @click="playAgain()">Play Again</button>
				<button class="button" style="border-color: red" @click="quit()">Quit</button>
			</div>
		</div>
	</modal>

	<modal name="quit-game">
		<div class="modal-header">Confirm</div>
		<div class="modal-body"><h4>Are you sure to quit game?</h4></div>
		<div class="modal-footer">
			<div class="button-group">
				<button class="button" @click="quit()">Yes</button>
				<button class="button" @click="$l.closeModal('quit-game')">No</button>
			</div>
		</div>
	</modal>

</div>
</template>

<style>

.button-group{
	display: flex;
	justify-content: space-around;
}

.button-group > * {
	min-width: 100px;
}

.game-table, .game-table > tr > td{
	border-collapse: collapse;
	border: solid 1px white;
}

.game-table > tr > td{
	text-align: center;
	height: 60px;
	width: 60px;
	font-weight: bold;
	font-size: 20px;
}
</style>

<script>

import cell from './Cell.vue'
import ai from './ai.js'

export default{
	created: function(){
		this.$store.commit('newgame')
	},
	
	data: function() {
		return {

			win_pattern: [
				[0, 1, 2],
				[0, 3, 6],
				[0, 4, 8],
				[1, 4, 7],
				[2, 4, 6],
				[2, 5, 8],
				[3, 4, 5],
				[6, 7, 8]
			],

			trash_talk: [
				'Bobo tanga tanga',
				'A.I. na nga lang tinalo pa',
				'Walang kwenta',
				'obob, Wik'
			]
		}
	},

	components: {
		'cell': cell
	},

	methods: {

		aiTurn: function() {
			let ai1 = ai(this.cells, this.move, this.logs[this.logs.length-1])
			if (this.mode === 0)
				this.placeTurn(ai1.getAIEasy(), true)
			else 
				this.placeTurn(ai1.getAIHard(), true)
		},

		addLogs: function(turn, place, move){
			let logs = {
				player: turn,
				place: place,
				move: move
			}
			this.$store.commit('addLogs', logs)
		},

		isValidPlace: function(place) {
			return this.cells[place] === 2
		},

		isPlayer: function(player) {
			// Player 1 always true
			if (player == 0) return true

			//If player 2 the mode must be 2 player
			else if (player == 1 && this.mode == 2) return true

			//if AI the mode must be AI easy or Ai hard
			else if (player == 2 && (this.mode == 0||this.mode==1)) return true

			else return false
		},

		playAgain: function() {
			this.$l.closeModal('gameover')
			this.$store.commit('newgame')
			this.$store.commit('resetCell')
			if (this.turn == 2) {
				setTimeout(()=>this.aiTurn(), 1000)
			}
		},

		placeTurn: function(place, ai) {
			/**
			 * VALIDATE MOVE
			 * Check if current turn is ai
			 * and the one who move is not 
			 * then it will not execute
			 */
			if (this.turn === 2 && ai == undefined)
				return false

			/**
			 * Check if the place is still
			 * available if not, the execution will stop
			 */
			if (!this.isValidPlace(place))
				return false

			this.$store.commit('updateCell', [place, this.move]) //Place Turn
			this.addLogs(this.turn, place, this.move) //Add Logs
			this.$store.commit('switchMove') //Switch Move

			if (this.isGameOver()) {
				let winner = this.getWinner().winner
				if (!this.isDraw()) this.$store.commit('incrementScore', winner)
				this.$l.openModal('gameover')
			} else if (this.turn === 2) {
				setTimeout(()=>this.aiTurn(), 1000)
			}

		},

		quit: function(){
			this.$store.dispatch('resetGame')
			this.$router.go(-1)
		},

		getWinner: function() {
			if (!this.isGameOver()) return false
			let current_game = this.logs[this.logs.length-1]
			let winner = current_game[current_game.length-1].player
			let message = ''

			if (this.isDraw())
				message = 'Draw'
			else if (winner == 0 || winner ==1) 
				message = this.players[winner]+ ' Win'
			else 
				message = this.generateTrashtalk()
			
			return {winner, message}

		},

		generateTrashtalk: function() {
			let ts = this.trash_talk;
			let random = Math.floor(Math.random()*ts.length);
			return ts[random];
		},

		isDraw: function() {
		    //CHECK IF DRAW
		    return this.cells.every(x=>x!==2)
		},

		isGameOver: function() {
			//CHECK IF THERES ALREADY A WINNER
			for (let i in this.win_pattern) {
				let win_pattern = this.win_pattern[i].map((x)=>this.cells[x])
				if (win_pattern.every(x=>x===0) || win_pattern.every(x=>x===1)) return true
			}

			return this.isDraw()

		}
	},

	computed: {
		cells: function() {
			return this.$store.state.cells
		},

		modes: function(){
			return this.$store.state.modes
		},

		mode: function(){
			return this.$store.state.mode
		},

		moves: function(){
			return this.$store.state.moves
		},

		move: function(){
			return this.$store.state.move
		},

		logs: function(){
			return this.$store.state.logs
		},

		players: function(){
			return this.$store.state.players
		},

		scores: function(){
			return this.$store.state.scores
		},

		turn: function(){

			let logs = this.logs

			let current_game = logs[logs.length - 1]

			let negate = (player) => {
				if (player != 0 ) return 0
				else if (this.mode == 2) return 1
				else return 2
			}

			//IF FIRST GAME
			if (logs.length == 1 && current_game.length < 1)
				return 0 //RETURN PLAYER 1
			else if (logs.length > 1 && current_game.length < 1) {
				let last_game = logs[logs.length-2]
				let last_turn = last_game[last_game.length-1]
				return negate(last_turn.player)
			} else {
				let last_turn = current_game[current_game.length-1]
				return negate(last_turn.player)
			}


			

		}
	}
}
</script>