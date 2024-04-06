<template>
	<div class="chat-list">
		<div class="chat-list-left">
			<ul>
				<li v-for="chat in ChatList" :key="chat.id">
					<button @click="selectChat(chat.id)">{{chat.name}}</button>
<!--					<routerLink :to="{name: 'Chat', params: {id: chat.id}}"></routerLink>-->
				</li>
			</ul>
		</div>
		<Chat class="chat-list-right" :targetName="selectChat" />
	</div>
</template>

<script setup lang="ts" name="ChatList">
import {ref} from "vue";
import Chat from "@/views/Chat.vue";

const ChatList = ref([
	{id: 1, name: '李四'},
	{id: 2, name: 'Mary'},
	{id: 3, name: 'Tom'},
	{id: 4, name: 'Jane'},
]);

function selectChat(id: number) {
	console.log(ChatList.value[id - 1].name);
}
</script>

<style scoped>
.chat-list {
	display: flex;
	align-items: center;
	overflow-y: auto;
}

.chat-list-left {
	flex: 1;
	max-width: 20%;
	height: 100%;
	overflow-y: auto;
}

.chat-list-right {
	border: 1px solid #ccc;
	flex: 1;
	height: 100%;
	max-width: 80%;
}
/* 去掉无序列表项的黑点 */
ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
	height: 100%;
}

li {
	border: 1px solid #cccccc;
	padding: 0;
	height: 40px;
	align-items: center;
}
button {
	width: 100%;
	height: 100%;
	border: none;
	background: none;
	text-align: center;
}
</style>
