<template>
	<header class="title-bar fixed-top">
		<h1 :class="'title '+lClass">
			<slot></slot>
		</h1>
		<button class="button" style="float: right;margin: 5px;" @click="back()">BACK</button>
	</header>
</template>

<script>
export default{
	props: ['lClass'],

	methods: {
		back: function(){
			this.$l.openModal('quit-game')
		}
	}
	
}
</script>


<style>
.title-bar {
	background: #2d3032;
	left: 0;
	right: 0;
	position: fixed;
	border-color: #ddd;
	border-width: 1px 0;
	border-style: solid;	
	border-bottom: 1px solid #2a2c2e;
	z-index: 1;
}

.title {
	float: left;
	margin-left: 5px;
	color: #ddd;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	outline: 0 !important;
	min-height: 1.1em;
	font-size: 1em;
}

.fixed-top {
	top: 0;
}
</style>
