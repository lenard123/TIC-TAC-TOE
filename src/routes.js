//import VueRouter from 'vue-router'
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
		name: 'game',
		beforeEnter: (to, from, next) => {
			if (from.name != 'home')
				next({name: 'home'})
			else next()
		}
	}
]

export default new VueRouter({
	routes
})
