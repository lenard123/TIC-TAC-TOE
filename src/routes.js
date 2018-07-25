import VueRouter from 'vue-router'
import home from './components/Home.vue'
import game from './components/Game.vue'

let routes = [
	{
		path: '/',
		component: home,
		name: 'home'
	},

	{
		path: '/game',
		component: game,
		name: 'game'
	}
]

export default new VueRouter({
	routes
})
