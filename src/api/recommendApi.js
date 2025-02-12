import request from "@/utils/request";
export function getRecommendList(){
    return request({
        url: "/recommend/getRecommendList",
        method: "get",
    })
}

export function updateRecommend(form){
    return request({
        url: "/recommend/updateRecommend",
        method: "post",
        data: form
    })
}
export function getRecommendTherapy(form){
    return request({
        url: "/recommend/getRecommendTherapy",
        method: "post",
        data: form
    })
}