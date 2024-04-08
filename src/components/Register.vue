<template>
	<div class="container-register">
		<form class="form" @submit.prevent="submitForm">
			<h2>用户注册</h2>
			<input v-model="username" placeholder="请输入用户名" required type="text">
			<br>
			<input v-model="password" placeholder="请输入密码" required type="password">
			<br>
			<input v-model="rePassword" placeholder="请再次输入密码" required type="password">
			<br>
			<button type="submit">确认注册</button>
			<router-link to="login">返回登录界面</router-link>
		</form>
	</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

const username = ref('');
const password = ref('');
const rePassword = ref('');
const router = useRouter();

const submitForm = async () => {
	try {
		const response = await axios.post('/api/register', {
			username: username.value,
			password: password.value,
			rePassword: rePassword.value
		});
		alert(response.data.msg);
		if (response.status === 200 && response.data.msg === "注册成功") {
			await router.replace('/login'); // 使用 Vue Router 路由到登录页面
		}
	} catch (error) {
		console.error('Error:', error);
		alert("无法从服务器获取数据");
	}
}
</script>

<style scoped>
.container-register {
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
