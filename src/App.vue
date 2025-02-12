<template>
  <div id="nav">
    <RouterLink class="nav-btn link" to="/symptom">
      在线就诊
    </RouterLink>
    <RouterLink class="nav-btn link" to="/history">
      就诊记录
    </RouterLink>
    <div id="user">
      <v-container style="height: 300px" fluid v-if="user.id != null">
        <v-row justify="center">
          <v-menu min-width="200px">
            <template v-slot:activator="{ props }">
              <v-btn icon v-bind="props">
                <v-avatar color="brown" size="large">
                  <v-img src="/default.jfif"></v-img>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-card-text>
                <div class="mx-auto text-center">
                  <v-avatar color="brown">
                    <v-img src="/default.jfif"></v-img>
                  </v-avatar>
                  <h3>{{ user.username }}</h3>
                  <v-divider class="my-3"></v-divider>
                  <v-btn variant="text" rounded>
                    <RouterLink to="/user" class="link">
                      个人中心
                    </RouterLink>
                  </v-btn>
                  <v-divider class="my-3" v-if="user.admin"></v-divider>
                  <v-btn variant="text" rounded v-if="user.admin">
                    <RouterLink to="/admin" class="link">
                      管理员
                    </RouterLink>
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn variant="text" rounded @click="logoutFunction">
                    退出登录
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-row>
      </v-container>
      <v-btn v-else style="top: 10px;" variant="text">
        <RouterLink to="/login" style="text-decoration: none;color: black;">
          登录
        </RouterLink>
      </v-btn>
    </div>
  </div>
  <div id="body">
    <RouterView>

    </RouterView>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { onBeforeMount, onMounted } from 'vue';
import { getUserInfo,logout } from '@/api/userApi'
let user = ref({
})

// 页面加载前触发
onBeforeMount(() => {
  if (localStorage.getItem("token") == null) { //未登录
    router.push('/login') //跳转到登录页面
  }
})
// 页面加载完后触发
onMounted(() => {
  getUserInfoFunction();
})
// 获取用户信息
const getUserInfoFunction = () => {
  getUserInfo().then((res)=>{
    if(res.code){
      user.value = res.data
      localStorage.setItem('user',JSON.stringify(user.value))
    }
  })
}

const logoutFunction = () =>{
  logout().then((res)=>{
    if(res.code){
      localStorage.removeItem("token") // 删除token
      router.go(0) //刷新页面
    }
  })
}
</script>
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

#body {
  width: 100vw;
  min-height: calc(100vh - 80px);
  margin-top: 80px;
  background-color: whitesmoke;
}

#nav {
  position: fixed;
  width: 100vw;
  height: 80px;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  z-index: 100;
  box-shadow: grey 0 0 10px 2px;
}

.nav-btn {
  display: inline-block;
  height: 100%;
  text-align: center;
  padding: 30px;
  font-size: 20px;
  align-content: center;
  cursor: pointer;
  
}
.link{
  text-decoration: none;
  color: black;
}
.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

#user {
  position: absolute;
  top: 10px;
  right: 50px;
}
</style>
