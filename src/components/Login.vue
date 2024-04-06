<template>
	<div class="container">
		<form @submit.prevent="submitForm" class="form">
			<h2>用户登录</h2>
			<input v-model="username" type="text" placeholder="请输入用户名" required>
			<br>
			<input v-model="password" type="password" placeholder="请输入密码" required>
			<br>
			<button type="submit">确认登录</button>
			<br>
			<router-link to="register">去注册</router-link>
		</form>
	</div>
</template>

<script setup lang="ts">
import {provide, ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const submitForm = async () => {
	try {
		const response = await axios.post('/api/login', {
			username: username.value,
			password: password.value
		});
		console.log(response);
		alert(response.data.msg);
		if (response.status === 200 && response.data.msg === "登录成功") {
			await router.replace({
				path: '/wechat', // 使用 Vue Router 路由到聊天页面
				query: {
					uid: username.value
				}
			});
		}
	} catch (error) {
		console.error('Error:', error);
		alert("无法从服务器获取数据");
	}
}
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
.form {
	width: 300px;
	padding: 20px;
	background-color: #f0f0f0;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
	text-align: center;
	margin-bottom: 20px;
}
input,
button {
	width: 100%;
	padding: 10px;
	margin: 5px 0;
	border: none;
	border-radius: 5px;
	box-sizing: border-box;
}
button {
	background-color: #4CAF50;
	color: white;
	cursor: pointer;
}
button:hover {
	background-color: #45a049;
}
a {
	display: block;
	text-align: center;
	text-decoration: none;
	color: #4CAF50;
}
</style>
