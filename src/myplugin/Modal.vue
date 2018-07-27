<template>
<div class="modal" data-role="modal" :id="name">
	<div class="modal-content">
		<span class="close" @click="$l.closeModal(name)" v-if="dismissable">&times;</span>
		<slot></slot>
	</div>
</div>
</template>

<script>

require('./modal.css');

export default{
	props: {
		name,
		dismissable: {
			default: true
		}
	}
}
</script>