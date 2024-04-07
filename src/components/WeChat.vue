<template>
	<div class="container">
		<Menu class="menu"/>
		<ChatList class="chatList"/>
		<!--		<Chat class="chat"/>-->
	</div>
</template>

<script lang="ts" name="WeChat" setup>
import Menu from "@/views/Menu.vue";
import ChatList from "@/views/ChatList.vue";
</script>

<style scoped>
.container {
	border: 1px solid #000; /* 外边框 */
	display: flex;
	height: 70vh; /* 占据整个视口高度 */
	width: 60%;
	margin: 100px auto auto; /* 居中 顶部留白 */
	overflow-y: auto;
}

.menu {
	flex: 1;
	max-width: 5%;
	max-height: 100%;
}

.chatList {
	flex: 1;
	max-width: 95%;
	max-height: 100%;
}

.chat {
	flex: 1;
	max-width: 75%; /* 最大宽度为屏幕一半 */
}
</style>
