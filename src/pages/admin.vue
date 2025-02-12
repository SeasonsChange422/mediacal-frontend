<!--
 * @Author: Dhx
 * @Date: 2025-02-08 18:43:47
 * @Description: 
 * @FilePath: \medical-frontend\src\pages\admin.vue
-->
<template>
  <div
    style="z-index: 1000;transform: translate(0,-80px);background-color: white;min-height: 100vh;min-width: 100vw;position: absolute;">

    <v-app>
      <v-app-bar color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>后台管理系统</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon style="margin-right: 20px;">
          <RouterLink to="/" style="text-decoration: none;color:white"><v-icon>mdi-home</v-icon></RouterLink>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list density="compact" nav>
          <v-list-item v-for="item in menuItems" :key="item.title" :prepend-icon="item.icon" :title="item.title"
            :value="item.value" :to="item.route"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <RouterView></RouterView>
        </v-container>
      </v-main>
    </v-app>

  </div>
</template>
<script setup>
import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue'
onMounted(()=>{
  let user = JSON.parse(localStorage.getItem('user'))
  if(user&&user.admin==false)router.push('/')
  // router.push('/admin/chart')
})
const drawer = ref(false)

const menuItems = [
  { title: '仪表盘', icon: 'mdi-view-dashboard', route: '/admin/chart' },
  { title: '用户管理', icon: 'mdi-account-group', route: '/admin/users' },
  { title: '诊断', icon: 'mdi-check', route: '/admin/diagnosis' },
  { title: '用户反馈', icon: 'mdi-pencil', route: '/admin/feedback' },
  { title: '个性化推荐', icon: 'mdi-pencil', route: '/admin/recommend' },
]
</script>
<style scoped></style>