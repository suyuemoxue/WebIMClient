<template>
	<div class="chat-list">
		<div class="chat-list-left">
			<ul>
				<li v-for="(chat, index) in ChatList" :key="index">
					<button :class="{ active: chat.isActive }" @click="selectChat(chat.id)">
						{{ chat.name }}
					</button>
				</li>
			</ul>
		</div>
		<Chat :targetName="targetName" class="chat-list-right"/>
	</div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import Chat from "@/views/Chat.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const username = route.query.uid as string;
const ChatList = ref([
	{id: 1, name: '李四', isActive: false},
	{id: 2, name: '张三', isActive: false},
	{id: 3, name: '王五', isActive: false},
]);

let targetName = ref('');

function selectChat(id: number) {
	// 先将所有按钮设置为非激活状态
	ChatList.value.forEach(chat => chat.isActive = false);
	// 然后将当前点击的按钮设置为激活状态
	const selectedChat = ChatList.value.find(chat => chat.id === id);
	if (selectedChat) {
		selectedChat.isActive = true;
		targetName.value = selectedChat.name;
	}
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
	border: none; /* 去掉按钮的边框 */
	background: #f2f2f2; /* 按钮的默认背景颜色 */
	text-align: center; /* 文字居中 */
}

li button {
	transition: background-color 0.3s; /* 添加渐变动画效果 */
}

li button:hover {
	background-color: #e0e0e0; /* 鼠标悬停时背景颜色变深 */
}

li button.active {
	background-color: #c0c0c0; /* 点击后进一步加深颜色 */
}

</style>
