<template>
<div class="container">
	<l-header>{{ modes[mode] }}</l-header>
	<center>
		<h1>{{ players[turn] }} Turn</h1>

		<table class="game-table">			
			<tr>
				<td v-on:click="placeTurn(0)" :style="getStyle(0)">{{ moves[cells[0]] }}</td>
				<td v-on:click="placeTurn(1)" :style="getStyle(1)">{{ moves[cells[1]] }}</td>
				<td v-on:click="placeTurn(2)" :style="getStyle(2)">{{ moves[cells[2]] }}</td>
			</tr>
			<tr>
				<td v-on:click="placeTurn(3)" :style="getStyle(3)">{{ moves[cells[3]] }}</td>
				<td v-on:click="placeTurn(4)" :style="getStyle(4)">{{ moves[cells[4]] }}</td>
				<td v-on:click="placeTurn(5)" :style="getStyle(5)">{{ moves[cells[5]] }}</td>
			</tr>
			<tr>
				<td v-on:click="placeTurn(6)" :style="getStyle(6)">{{ moves[cells[6]] }}</td>
				<td v-on:click="placeTurn(7)" :style="getStyle(7)">{{ moves[cells[7]] }}</td>
				<td v-on:click="placeTurn(8)" :style="getStyle(8)">{{ moves[cells[8]] }}</td>
			</tr>
		</table>

	</center>
</div>
</template>

<style>
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
export default{
	created: function(){
		console.log(this)
		this.$store.commit('newgame')
	},
	
	data: function() {
		return {
			cells: [
				'', '', '',
				'', '', '',
				'', '', ''
			]
		}
	},

	methods: {

		addLogs: function(turn, place, move){
			let logs = {
				player: turn,
				place: place,
				move: move
			}
			this.$store.commit('addLogs', logs)
		},

		getStyle: function(place) {

		},

		isValidPlace: function(place) {
			return this.cells[place] === ''
		},

		placeTurn: function(place, ai) {
			/**
			 * VALIDATE MOVE
			 * Check if current turn is ai
			 * and the one who move is not 
			 * then it will not execute
			 */
			if (this.turn === 2 && ai == undefined)
				return

			/**
			 * Check if the place is still
			 * available if not, the execution will stop
			 */
			if (!this.isValidPlace(place))
				return

			this.cells[place] = this.move //Place turn
			this.addLogs(this.turn, place, this.move) //Add Logs
			this.$store.commit('switchMove') //Switch Move



		}
	},

	computed: {
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

		turn: function(){
			let current_game = this.logs[this.logs.length-1]; 

			/*
			 * CHECK IF FIRST GAME 
			 * RETURN PLAYER 1
			 */
			if (current_game.length < 1) 
				return 0
			else {
				let last_turn = current_game[current_game.length-1].player
				
				/*
				 * IF LAST TURN IS NOT PLAYER 1
				 * THEN THE CURRENT TURN IS PLAYER 1
				 */
				if (last_turn != 0)
					return 0
				/*
				 * IF 2 PLAYER MODE 
				 * THEN THE CURRENT TURN IS PLAYER 2
				 */
				else if (this.mode == 2)
					return 1
				// Return AI
				else 
					return 2
			}

		}
	}
}
</script>