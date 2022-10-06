<template>
<Teleport to="body">
	<Transition>
		<div v-if="show">
			<div class="w-screen h-screen top-0 left-0 fixed" v-on:click="close">
				<div>Hello</div>
			</div>
		</div>
	</Transition>
</Teleport>
</template>

<script lang="ts" setup>

const show = ref<boolean>(false);

const toggle = () => show.value = !show.value;
const open = () => show.value = true;
const close = () => show.value = false;

defineExpose({ toggle, open, close, show });
</script>

<style lang="stylus">

</style>

<style lang="stylus" scoped>

</style>
