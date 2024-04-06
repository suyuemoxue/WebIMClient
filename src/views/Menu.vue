<template>
	<div class="menu">
		<h5>{{ username }}</h5>
	</div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute();
const username = route.query.uid as string;
</script>

<style scoped>
.menu {
	background-color: #2E2E2E;
	display: flex;
	cursor: default;
	padding: 5px;
	transition: background-color 0.1s;
}
h5 {
	color: #fff;
}
</style>
