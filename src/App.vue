<template>
  	<transition name="fade">
		<keep-alive>
  			<router-view></router-view>
  		</keep-alive>
	</transition>
</template>

<style>
.fade-enter-active, .fade-leave-active{
	transition: opacity .5s
}

.fade-enter, .fade-leave-to{
	opacity: 0
}
</style>