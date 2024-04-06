<template>
	<div class="chat-list">
		<ul>
			<li v-for="chat in ChatList" :key="chat.id">
				<button @click="selectChat(chat.id)">{{ chat.name }}</button>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts" name="ChatList">
import {provide, ref} from "vue";

const ChatList = ref([
	{id: 1, name: '李四'},
	{id: 2, name: 'Mary'},
	{id: 3, name: 'Tom'},
	{id: 4, name: 'Jane'},
]);

function selectChat(id: number) {
	// TODO: implement logic to select chat
	console.log(ChatList.value[id - 1].name);
}
</script>

<style scoped>
.chat-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 70vh;
}
ul {
	margin: 0;
	padding: 0;
	width: 100%;
	list-style-type: none;
}
li {
	width: 100%;
	border: 1px solid #ccc;
	cursor: pointer;
}
button {
	padding: 10px;
	width: 100%;
	border: none;
	background-color: #fff;
	color: #333;
	font-size: 16px;
	font-weight: bold;
	text-align: center;
	cursor: pointer;
}
</style>
