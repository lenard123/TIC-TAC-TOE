<template>
<div class="container">
	<!--<l-header l-class="blink">TIC TAC TOE</l-header>-->

	<div class="row">

		<div class="col-xs-6 col-md-4 game-title">
			<table>
				<tr>
					<td :style="randomColor(0)">T</td>
					<td :style="randomColor(1)">I</td>
					<td :style="randomColor(2)">C</td>
				</tr>
				<tr>
					<td :style="randomColor(3)">T</td>
					<td :style="randomColor(4)">A</td>
					<td :style="randomColor(5)">C</td>
				</tr>
				<tr>
					<td :style="randomColor(6)">T</td>
					<td :style="randomColor(7)">O</td>
					<td :style="randomColor(8)">E</td>
				</tr>
			</table>
		</div>

		<div class="col-xs-6 col-md-8" style="margin-top: 10px;">
			<form @submit.prevent="submitName()">
				<ul class="full-width vertical-list">
					<li><input type="text" placeholder="Enter your name here" class="search-input full-width" v-model="name" /></li>
					<li><input type="submit" value="Submit" class="button full-width"/></li>
				</ul>
			</form>
		</div>

	</div>

	<modal name='menu'>
		<div class="modal-header">CHOOSE GAME MODE</div>
		<div class="modal-body">
			<ul class="vertical-list full-width">
				<li v-for="(mode,i) in modes">
					<input type="button" class="button full-width" :value="mode" @click="submit(i)"/>
				</li>
			</ul>
		</div>
	</modal>

</div>
</template>


<script>
export default{
	data: function() {
		return {
			color:[
				{r:0,g:0,b:0},
				{r:0,g:0,b:0},
				{r:0,g:0,b:0},
				{r:0,g:0,b:0},
				{r:0,g:0,b:0},
				{r:0,g:0,b:0},
				{r:0,g:0,b:0},
				{r:0,g:0,b:0},
				{r:0,g:0,b:0}
			],
			name: ''
		}
	},

	created: function() {
		let vm = this
		setInterval(function(){
			for (var i = 0; i<9; i++){
				vm.color[i].r = Math.floor(Math.random()*255)
				vm.color[i].g = Math.floor(Math.random()*255)
				vm.color[i].b = Math.floor(Math.random()*255)
			}
		},500)
	},

	methods: {
		randomColor: function(i) {
			let color = this.color[i]
			return `color: rgb(${color.r}, ${color.g}, ${color.b});`
		},

		submitName: function() {
			let name = this.name
			let players = this.players
			if (name == '' || name == players[1] || name == players[2] )
				return this.$l.alert('Invalid Name', 'FAILED!!!');
			this.$l.openModal('menu');
		},

		submit: function(mode) {
			this.$store.commit('player1', this.name)
			this.$store.commit('mode', mode)
			this.$l.closeModal('menu')
			this.$router.push({name: 'game'})
		}
	},

	computed: {
		players: function() {
			return this.$store.state.players
		},

		modes: function() {
			return this.$store.state.modes
		}
	}
}
</script>