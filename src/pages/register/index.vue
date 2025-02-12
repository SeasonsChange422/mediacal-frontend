<!--
 * @Author: Dhx
 * @Date: 2025-02-02 13:00:57
 * @Description: 
 * @FilePath: \medical-frontend\src\pages\register\index.vue
-->
<template>
    <div id="register-page">
        <div id="register-container">
            <div id="register-text">
                注册
            </div>
            <div id="register-input">
                <v-text-field label="用户名" variant="outlined" v-model="registerForm.username"></v-text-field>
                <v-text-field label="密码" variant="outlined" v-model="registerForm.password"></v-text-field>
            </div>
            <RouterLink to="/login">登录</RouterLink>
            <div id="register-button">
                <v-btn variant="outlined" @click="registerFunction">
                    注册
                </v-btn>
            </div>
        </div>
    </div>
    <v-snackbar v-model="snackbar.model" :timeout="2000" multi-line :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>
<script setup>
import { register } from '@/api/userApi';
import router from '@/router';
import { ref } from 'vue';
let snackbar = ref({
    model:false,
    text:'',
    color:''
})
let registerForm = ref({
    username: '',
    password: ''
})
const registerFunction = () => {
    register(registerForm.value).then((res) => {
        if (res.code == 200) { // 成功
            localStorage.setItem("token", res.data)
            snackbar.value.model = true
            snackbar.value.text = res.msg
            snackbar.value.color = 'success'
            setTimeout(()=>{ // 两秒后跳转到登录页面
                router.push("/login") 
            },2000)
        } else {
            snackbar.value.model = true
            snackbar.value.text = res.msg
            snackbar.value.color = 'error'
        }
    })
}

</script>
<style scoped>
#register-page {
    position: relative;
    height: 100vh;
    width: 100vw;
}

#register-container {
    position: relative;
    padding: 10px;
    width: 20%;
    left: 50%;
    top: 50%;
    border-radius: 15px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 15px 5px;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.2);
}

#register-text {
    position: relative;
    height: 60px;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
}

#register-input {
    position: relative;
    width: 70%;
    left: 50%;
    transform: translate(-50%);
}

#register-button {
    position: relative;
    text-align: center;
}
</style>