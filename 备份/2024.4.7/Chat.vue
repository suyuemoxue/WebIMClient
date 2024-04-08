<template>
	<div class=" message-sender">
		<p>{{ props.targetName }}</p>
		<hr>
		<div class="received-message">
			<ul>
				<li v-for="(value, index) in props.msgList" :key="index" v-show="value.receiveId"
						:class="value.sendId === username ? 'right' : 'left'">{{ value.sendId }} : {{ value.content }}
				</li>
				<li v-for="(value, index) in messageList" v-show="value.receiveId"
						:class="value.sendId === username? 'right' : 'left'">{{ value.sendId }} : {{ value.content }}
				</li>
			</ul>
		</div>
		<hr>
		<div class="input-message">
			<input v-model="message" class="input-field" placeholder="请输入消息" required type="text"/>
			<button class="send-button" type="submit" @click="sendMessage">发送</button>
		</div>
	</div>
</template>

<script lang="ts" name="Chat" setup>
import {useRoute} from "vue-router";
import {reactive, ref} from "vue";
import type {Message, Messages} from "@/types";

const route = useRoute();
const username = route.query.uid as string; // 获取当前用户的uid
const props = defineProps(['targetName', 'msgList']); // 接收从ChatList.vue传递的targetName和msgList
const message = ref('');
let messageList = reactive<Messages>([
	{sendId: "", receiveId: "", content: "", msgType: "", mediaType: ""},
])

// 连接websocket服务端
const socketUrl = ref(`ws://localhost:8081/chat?uid=${username}`);
let socket = new WebSocket(socketUrl.value);
// 监听websocket服务端消息d
socket.onmessage = function (event) { // 接收消息
	const receivedMessage = JSON.parse(event.data);
	console.log(receivedMessage);
	if (receivedMessage === "有字段为空") {
		alert("目标用户和消息不能为空");
		return;
	}
	messageList.push(receivedMessage); // 根据实际数据结构更新
};

const sendMessage = async () => { // 发送消息
	if (!props.targetName || !message.value) { 	// 校验Sender和Message是否为空
		alert("目标用户和消息不能为空");
		return;
	}
	const sendMessage: Message = {
		sendId: username,
		receiveId: props.targetName,
		content: message.value,
		msgType: "private",
		mediaType: "text"
	}
	console.log(sendMessage);
	messageList.push(sendMessage);
	socket.send(JSON.stringify(sendMessage));
	message.value = ''; // 清空输入框
};
</script>

<style scoped>
.left {
	text-align: left;
}

.right {
	text-align: right;
}

.message-sender {
	border: 1px solid #ccc;
	height: 70vh;
}

.received-message {
	height: 500px;
	border-radius: 5px;
	margin-bottom: 10px;
	font-size: 16px;
}

.input-field {
	width: 90%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
	margin: auto 5px auto auto;
}

.send-button {
	width: 80px;
	padding: 8px;
	border: none;
	border-radius: 5px;
	background-color: #007bff;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
}

.send-button:hover {
	background-color: #0056b3;
}

.input-message {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 10px 5px auto 5px;
}

/* 去掉无序列表项的黑点 */
ul {
	list-style-type: none;
}

p {
	font-size: 15px;
	height: 10px;
	text-align: center;
}

hr {
	margin-top: 10px;
	margin-bottom: 10px;
	border: none;
	border-top: 1px solid #ccc;
}
</style>
