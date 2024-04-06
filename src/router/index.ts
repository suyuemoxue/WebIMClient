import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/components/Home.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import WeChat from "@/components/WeChat.vue";
import Menu from "@/views/Menu.vue";
import ChatList from "@/views/ChatList.vue";
import Chat from "@/views/Chat.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/register',
      name:'register',
      component: Register
    },
    {
      path:'/wechat',
      name:'wechat',
      component: WeChat,
      // children: [
      //   {
      //     path: '',
      //     component: Menu
      //   },
      //   {
      //     path:'',
      //     component: ChatList
      //   },
      //   {
      //     path: 'chat',
      //     component: Chat
      //   }
      // ]
    },
  ]
})

export default router
