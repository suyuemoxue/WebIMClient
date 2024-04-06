<template>
	<div class=" message-sender">
		<p>{{ targetName.targetName }}</p>
		<hr>
		<div class="received-message">
			<ul>
				<li v-for="value in receivedMessage" v-show="value.receiveId">{{ value.sendId }} : {{ value.message }}</li>
			</ul>
		</div>
		<hr>
		<div class="input-message">
			<input v-model="message" type="text" class="input-field" placeholder="请输入消息" required/>
			<button @click="sendMessage" class="send-button" type="submit">发送</button>
		</div>
	</div>
</template>

<script setup lang="ts" name="Chat">
import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const username = route.query.uid as string;
const targetName = defineProps(['targetName']); // 接收从ChatList.vue传递的targetName
const message = ref('');
const receivedMessage = ref([])

const socketUrl = ref(`ws://localhost:8081/chat?uid=${username}`);
let socket = new WebSocket(socketUrl.value);

socket.onmessage = function (event) { // 接收消息
	const data = JSON.parse(event.data);
	console.log(data);
	if (data === "有字段为空") {
		alert("目标用户和消息不能为空");
		return;
	}
	receivedMessage.value.push(data); // 根据实际数据结构更新
};

const sendMessage = async () => { // 发送消息
	if (!targetName.targetName || !message.value) { 	// 校验Sender和Message是否为空
		alert("目标用户和消息不能为空");
		return;
	}
	socket.send(JSON.stringify({
		sendId: username,
		receiveId: targetName.targetName,
		message: message.value,
		msgType: "private",
		mediaType: "text"
	}));
	message.value = ''; // 清空输入框
};
</script>

<style scoped>
.message-sender {
	border: 1px solid #ccc;
	height: 70vh;
}

.received-message {
	height: 300px;
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
