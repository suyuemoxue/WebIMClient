<template>
	<div class="chat-list">
		<div class="chat-list-left">
			<ul>
				<li v-for="(chat, index) in ChatList" :key="index">
					<button :class="{ active: chat.isActive }" @click="selectChat(chat.name)">{{ chat.name }}</button>
				</li>
			</ul>
		</div>
		<Chat :targetName="targetName" :msgList="MsgList" class="chat-list-right"/>
	</div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import Chat from "@/views/Chat.vue";
import axios from "axios";
import type {Messages} from "@/types";
import {useRoute} from "vue-router";

const route = useRoute();
const username = route.query.uid as string; // 获取当前用户的uid
const ChatList = ref([
	{name: '李四', isActive: false},
	{name: '张三', isActive: false},
	{name: '王五', isActive: false},
]);
const MsgList = reactive<Messages>([
	{sendId: "", receiveId: "", content: "", msgType: "", mediaType: ""},
])
let targetName = ref('');

// const selectChat = async (name: string) => {
// 	// 先将所有按钮设置为非激活状态
// 	ChatList.value.forEach(chat => chat.isActive = false);
// 	// 然后将当前点击的按钮设置为激活状态
// 	const selectedChat = ChatList.value.find(chat => chat.name === name);
// 	if (selectedChat) {
// 		selectedChat.isActive = true;
// 		targetName.value = selectedChat.name;
// 	}
// 	await getHistoryMessage();
// }

async function selectChat(name: string) {
	// 先将所有按钮设置为非激活状态
	ChatList.value.forEach(chat => chat.isActive = false);
	// 然后将当前点击的按钮设置为激活状态
	const selectedChat = ChatList.value.find(chat => chat.name === name);
	if (selectedChat) {
		selectedChat.isActive = true;
		targetName.value = selectedChat.name;
	}
	await getHistoryMessage();
}

// 监听消息列表变化，发送请求获取和对方的聊天记录
async function getHistoryMessage() {
	// 向服务端发送请求，获取对方的聊天记录
	const response = await axios.post("/api/getUserHistoryMessage", {
		username: username,
		targetName: targetName.value
	});
	let jsonDataArray: string[] = [];
	// 检查数据是否只有一条，如果是，则手动包装成数组
	if (typeof response.data === 'string' && response.data.includes('\n')) {
		jsonDataArray = response.data.split('\n').filter(Boolean); // 拆分数据并过滤空字符串
		// 逐个将jsonDataArray数组中的每个 JSON 字符串解析为 JavaScript 对象，并添加到MessageList.value数组中
		MsgList.splice(0, MsgList.length);
		jsonDataArray.forEach(jsonData => {
			MsgList.push(JSON.parse(jsonData));
		});
	} else {
		MsgList.splice(0, MsgList.length);
		MsgList.push(response.data)
	}
	console.log("ChatList:",MsgList);
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
