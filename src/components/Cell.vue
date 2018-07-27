<template>
<td :style="getStyle(id)" @click="$parent.placeTurn(id)">
	{{ value	}}
</td>
</template>

<script>
export default {
	props: ['id'],

	methods: {
		getStyle: function(id) {

		}
	},

	computed: {
		value: function(){
			return this.moves[this.cells[this.id]]
		},

		cells: function(){
			return this.$store.state.cells
		},

		moves: function(){
			return this.$store.state.moves
		}
	}
}
</script>