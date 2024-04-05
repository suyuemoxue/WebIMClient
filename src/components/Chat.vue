<template>
	<div class="message-sender">
		<h3>{{ username }}</h3>
		<h3>目标用户: <input v-model="targetUser" type="text" class="input-field" placeholder="请输入目标用户的ID"/></h3>
		<div class="received-message">
			<ul>
				<li v-for="(item, index) in receivedMessage.split('\n')">{{ item }}</li>
			</ul>
		</div>
		<input v-model="message" type="text" class="input-field" placeholder="请输入消息"/>
		<button @click="sendMessage" class="send-button">发送</button>
	</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const username = route.query.uid as string;
const targetUser = ref('');
const message = ref('');
const receivedMessage = ref('');

const socketUrl = ref(`ws://localhost:8081/ws/chat?uid=${username}`);
let socket = new WebSocket(socketUrl.value);

socket.onmessage = function (event) {
	const data = JSON.parse(event.data);
	receivedMessage.value = data.message; // 根据实际数据结构更新
};

const sendMessage = async () => {
	socket.send(JSON.stringify({
		sendId: username,
		receiveId: targetUser.value,
		message: message.value,
		msgType: "private",
		mediaType: "text"
	}));
};
</script>

<style scoped>
.message-sender {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.received-message {
	height: 500px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-bottom: 10px;
	font-size: 16px;
}

.input-field {
	width: calc(100% - 85px);
	padding: 8px;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
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
</style>
