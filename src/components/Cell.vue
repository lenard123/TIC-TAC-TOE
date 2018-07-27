<template>
<td :style="getStyle()" @click="$parent.placeTurn(id)">
	{{ value	}}
</td>
</template>

<script>
export default {
	props: ['id'],

	methods: {
		getStyle: function() {
			if (this.cells[this.id]===0)
				return {backgroundColor: 'black'}
			else if (this.cells[this.id]===1)
				return {backgroundColor: '#2d2d2d'}
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