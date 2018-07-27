export default function ai(cells, move, game) {
	return {

		cells,
		move,
		game,

		corners: [0, 2, 6, 8],

		corner_patterns: [
			[0,2,8],
			[0,6,8],
			[0,8,2],
			[2,0,6],
			[2,8,0],
			[2,6,0],
			[6,0,2],
			[6,8,2],
			[6,2,8],
			[8,2,0],
			[8,6,0],
			[8,0,6]
		],

		diagonal_pattern: [
			[0,8], 
			[2,6], 
			[6,2], 
			[8,0]
		],

		sides: [1, 3, 5, 7],

		side_patterns: [
			[0,1,6],
			[0,3,4],
			[0,5,2],
			[0,7,6],
			[2,1,8],
			[2,5,0],
			[2,3,0],
			[2,7,8],
			[6,3,8],
			[6,7,0],
			[6,1,0],
			[6,5,8],
			[8,5,6],
			[8,7,2],
			[8,1,2],
			[8,3,6]
		],

		beside_patterns: [
			[0,1,3],
			[2,1,5],
			[6,3,7],
			[8,5,7]
		],

		win_pattern: [
			[0,1,2], 
			[0,3,6], 
			[0,4,8], 
			[1,4,7], 
			[2,4,6], 
			[2,5,8], 
			[3,4,5], 
			[6,7,8]
		],

		getAIEasy: function() {
			if (this.isDraw())
				return false
			if (this.getFinishingPlace() !== false) 
				return this.getFinishingPlace()
			if (this.getDangerPlace() !== false)
				return this.getDangerPlace()
			return this.random()
		},

		getAIHard: function(){
			if (this.isDraw())
				return false
			else if (game.length == 0)
				/**
			     * For First turn choose a random valid 
			     * move in the corner
			     */
				return this.randomCorner()
			else if (game.length == 1) {
				/**
				 * For 2nd turn choose center if possible
				 * else choose a random place in the corner
				 */
				if (this.isValidPlace(4))
					return 4
				else 
					return this.randomCorner()
			}
			else if (game.length == 2) {
				/**
				 * For 3rd turn occupied the other 
				 * Corner
				 */
				if (this.isSide(this.getPlace(1))) 
					return this.getSideCorner(this.getPlace(0), this.getPlace(1))
				else if (this.isCorner(this.getPlace(1)))
					return this.getCornerCorner(this.getPlace(0), this.getPlace(1))
				else 
					return this.randomSide()
			} else if (game.length == 3) {
				/**
				 * For 4th turn
				 * Check if you have a danger spot
				 * and block it else choose a random valid
				 * move
				 */
				if (this.getDangerPlace() !== false) 
					return this.getDangerPlace()
				else 
					return this.random()
			} else if (game.length == 4) {
				/**
				 *  For 5th turn Check if you have a finishing place
				 *  if not check if you have a danger place
				 *  if not check if the 2nd turn is in the corner
				 *  then choose a random move in the corner
				 *  if not check if the 2nd turn is in the side part
				 *  then choose the diagonal part of your first turn
				 *  if not possible then just choose a random move
				 *  in the side part
				 */
				if (this.getFinishingPlace() !== false)
					return this.getFinishingPlace()
				else if (this.getDangerPlace() !== false)
					return this.getDangerPlace()
				else if (this.isCorner(this.getPlace(1)))
					return this.randomCorner()
				else if (this.isSide(this.getPlace(1))){
					if (this.isBeside(this.getPlace(1)))
						return this.getDiagonal(this.getPlace(0))
					else
						return this.getDiagonal(this.getPlace(2))
				}
				else 
					return this.randomSide()
			} else {
				/**
				 * For 6th, 7th, 8th, and 9th turn
				 * Check if you have a finishing spot
				 * then choose it
				 * if not Check if you have a danger spot then block it
				 * else just choose a random move
				 */
				if(this.getFinishingPlace() !== false)
					return this.getFinishingPlace()
				else if (this.getDangerPlace() !== false)
					return this.getDangerPlace()
				else
					return this.random()
			}

		},

		getCornerCorner: function(corner, corner1){
			if (!this.isCorner(corner) && !this.isCorner(corner1)) return false
			for (var pattern in this.corner_patterns) {
				if (this.corner_patterns[pattern][0] == corner)
					if (this.corner_patterns[pattern][1] == corner1)
						return this.corner_patterns[pattern][2]
			}
		},

		getDangerPlace: function() {
			let opponent_move = move == 0 ? 1: 0
			return this.win_place(opponent_move)
		},

		getDiagonal: function(place) {
			for (var i in this.diagonal_pattern) 
				if (this.diagonal_pattern[i][0]==place)
					return this.diagonal_pattern[i][1]
			return false
		},

		getFinishingPlace: function() {
			return this.win_place(move)
		},

		getPlace: function(turn) {
			if (turn > game.length-1)
				return false
			return game[turn].place
		},

		getSideCorner: function(corner, side) {
			if (!this.isCorner(corner)) return false
			if (!this.isSide(side)) return false;
			for (var i in this.side_patterns) {
				if (this.side_patterns[i][0] == corner && this.side_patterns[i][1] == side)
					return this.side_patterns[i][2]
			}
		},

		hasCorner: function(){
			return this.corners.some(corner=>cells[corner]==2)
		},

		hasSide: function() {
			return this.sides.some(side=>cells[side]==2)
		},
		
		isBeside: function(corner, side) {
			if (!this.isCorner(corner)&&!this.isSide(side)) return false
			for (var i in this.beside_patterns) 
				if (this.beside_patterns[i][0]==corner)
					return this.beside_patterns[i][0]==side||this.beside_patterns[i][1]==side
		},

		isCorner: function(place) {
			return this.corners.some(corner=>corner==place)
		},

		isDraw: function() {
			return cells.every((cell)=>cell!==2)
		},

		isSide: function(place) {
			return this.sides.some((side)=>side==place)
		},

		isValidPlace: function(place) {
			return cells[place] == 2
		},

		random: function(){
			let place = Math.floor(Math.random()*cells.length)
			if (this.isDraw())
				return false
			else if (this.isValidPlace(place))
				return place 
			else return this.random()
		},

		randomCorner: function(){
			let place = this.corners[Math.floor(Math.random()*this.corners.length)]
			if (!this.hasCorner())
				return false
			else if (this.isValidPlace(place))
				return place
			else return this.randomCorner()
		},

		randomSide: function(){
			let place = this.sides[Math.floor(Math.random()*this.sides.length)]
			if (!this.hasSide())
				return false
			else if (this.isValidPlace(place))
				return place
			else return this.randomSide()
		},

		win_place: function(val){

			for (var i in this.win_pattern) {
				let pattern = this.win_pattern[i].filter((place)=>cells[place]==val)
				if (pattern.length == 2) {
					for (var i1 in this.win_pattern[i])
						if (cells[this.win_pattern[i][i1]] == 2)
							return this.win_pattern[i][i1]
				}
			}
			return false
		}
	}
}