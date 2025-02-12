import request from "@/utils/request";
export function getUserList(){
    return request({
        url: "/admin/getUserList",
        method: "get",
    })
}
export function setAdmin(form){
    return request({
        url: "/admin/setAdmin",
        method: "post",
        params: {
            userId: form
        }
    })
}
export function getSymptomListByUserId(form){
    return request({
        url: '/admin/getSymptomListByUserId',
        method: "post",
        params: {
            userId: form
        }
    })
}
export function getSymptomListWithoutDiagnosis(){
    return request({
        url: "/admin/getSymptomListWithoutDiagnosis",
        method: "get",
    })
}
export function getUserInfoById(form){
    return request({
        url: "/admin/getUserInfoById",
        method: "get",
        params: {
            userId: form
        }
    })
}
export function addDiagnosis(form){
    return request({
        url: "/admin/addDiagnosis",
        method: "post",
        data:form
    })
}
export function getDiagnosisBySymptomId(form){
    return request({
        url: "/admin/getDiagnosisBySymptomId",
        method: "get",
        params: {
            symptomId: form
        }
    })
}
export function getFeedbackList(){
    return request({
        url: "/admin/getFeedbackList",
        method: "get",
    })
}
export function getTherapyByUserId(form){
    return request({
        url: "/admin/getTherapyByUserId",
        method: "get",
        params: {
            userId: form
        }
    })
}

export function editTherapy(form) {
    return request({
        url: "/admin/editTherapy",
        method: "post",
        data: form
    })
}

export function addTherapy(form){
    return request({
        url: "/admin/addTherapy",
        method: "post",
        data: form
    })
}
