import request from "@/utils/request";
export function login(form){
    return request({
        url: "/user/login",
        method: "post",
        data:form
    });
}

export function register(form){
    return request({
        url: "/user/register",
        method: "post",
        data:form
    });
}

export function getUserInfo(){
    return request({
        url: "/user/getInfo",
        method: "get",
    })
}

export function logout(){
    return request({
        url: "/user/logout",
        method: "post"
    })
}

export function updateUserInfo(form){
    return request({
        url: "/user/update",
        method: "post",
        data: form
    });
}