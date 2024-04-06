<template>
	<div class="container">
		<Menu class="menu" />
		<ChatList class="chatList"/>
		<Chat class="chat"/>
	</div>
</template>

<script setup lang="ts">
import Menu from "@/views/Menu.vue";
import ChatList from "@/views/ChatList.vue";
import Chat from "@/views/Chat.vue";

</script>

<style scoped>
.container {
	border: 1px solid #000; /* 外边框 */
	display: flex;
	height: 70%; /* 占据整个视口高度 */
	width: 60%;
	margin: 100px auto auto;/* 居中 顶部留白 */
	overflow-y: auto;
}

.menu {
	flex: 1;
	max-width: 3%; /* 最大宽度为屏幕一半 */
}

.chatList {
	flex: 1;
	max-width: 22%; /* 最大宽度为屏幕一半 */
}

.chat {
	flex: 1;
	max-width: 75%; /* 最大宽度为屏幕一半 */
}
</style>
