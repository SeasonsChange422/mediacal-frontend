/*
 * @Author: Dhx
 * @Date: 2025-01-13 22:45:23
 * @Description: 
 * @FilePath: \medical-frontend\src\utils\request.ts
 */
import axios from 'axios'
import router from '../router'
const request = axios.create({
    baseURL: '/api',
    timeout: 60000,
})

request.interceptors.request.use(config => {
    if(localStorage.getItem("token")) {
        config.headers.token = localStorage.getItem("token")
    }
    return config
}, (error) => Promise.reject(error))

request.interceptors.response.use(response => {
    const res = response.data
    if (res.code == '401' ) {  // 未登录或登录过期
        localStorage.removeItem("token") //清空本地token
        router.push('/login') //跳转到登录页
    }
    return res
}, (error) => {
    if (error.name == 'Error') {
        // useMessage().error(error.msg)
    } else {
        // useMessage().error(error.response.data.data || error.message)
    }
    return Promise.reject(error)
})

export default request