<template>
  	<transition name="fade">
		<router-view></router-view>
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