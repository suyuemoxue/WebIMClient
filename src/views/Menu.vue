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
	background-color: slategray;
	display: flex;
	width: 30px;
	cursor: default;
	padding: 12px;
	transition: background-color 0.1s;
}
</style>
