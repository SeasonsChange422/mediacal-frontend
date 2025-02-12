<!--
 * @Author: Dhx
 * @Date: 2025-02-02 12:50:59
 * @Description: 
 * @FilePath: \medical-frontend\src\pages\login\index.vue
-->
<template>
    <div id="login-page">
        <div id="login-container">
            <div id="login-text">
                登录
            </div>
            <div id="login-input">
                <v-text-field label="用户名" variant="outlined" v-model="loginForm.username"></v-text-field>
                <v-text-field label="密码" variant="outlined" v-model="loginForm.password"></v-text-field>
            </div>
            <RouterLink to="/register">注册</RouterLink>
            <div id="login-button">
                <v-btn variant="outlined" @click="loginFunction">
                    登录
                </v-btn>
            </div>
        </div>
    </div>
    <v-snackbar v-model="snackbar.model" :timeout="2000" multi-line :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>
<script setup>
import { login } from '@/api/userApi';
import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
let snackbar = ref({
    model:false,
    text:'',
    color:''
})
let loginForm = ref({
    username:'',
    password:''
})
const loginFunction = ()=>{
    login(loginForm.value).then((res)=>{
        if(res.code == 200){
            localStorage.setItem("token",res.data)
            snackbar.value.model = true
            snackbar.value.text = res.msg
            snackbar.value.color = 'success'
            router.go(0) //刷新页面
        } else {
            snackbar.value.model = true
            snackbar.value.text = res.msg
            snackbar.value.color = 'error'
        }
    })
}
onMounted(()=>{
    if(localStorage.getItem('token')!=null){
        router.push('/symptom')
    }
})
</script>
<style scoped>
#login-page {
    position: relative;
    height: 100vh;
    width: 100vw;
}

#login-container {
    position: relative;
    padding: 10px;
    width: 20%;
    left: 50%;
    top: 50%;
    border-radius: 15px;
    text-align: center;
    box-shadow: grey 0 0 10px 2px;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.3);
}

#login-text {
    position: relative;
    height: 60px;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
}

#login-input {
    position: relative;
    width: 70%;
    left: 50%;
    transform: translate(-50%);
}
#login-button {
    position: relative;
    text-align: center;
}
</style>