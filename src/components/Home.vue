<template>
<h1>这是一个聊天系统</h1>
	<div>
		<RouterLink to="login">登录</RouterLink>
	</div>
</template>

<script setup lang="ts" name="Home">

</script>

<style scoped>
/* 将登录按钮放在屏幕右上角 */
div {
	position: fixed; /* 将元素的定位方式设置为固定定位，相对于浏览器窗口定位 */
	top: 20px; /* 与顶部的距离为 20 像素 */
	right: 20px; /* 与右侧的距离为 20 像素 */
}

/* 可选：为登录按钮添加样式 */
RouterLink {
	padding: 10px 20px; /* 设置按钮内边距 */
	background-color: #007bff; /* 设置按钮背景颜色 */
	color: #fff; /* 设置按钮文字颜色 */
	text-decoration: none; /* 去除链接的下划线 */
	border-radius: 5px; /* 设置按钮圆角 */
}

RouterLink:hover {
	background-color: #0056b3; /* 设置鼠标悬停时按钮背景颜色 */
}

</style>
