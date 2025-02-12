
import request from "@/utils/request";

export function getTherapyByUserId(form){
    return request({
        url: "/therapy/getTherapyByUserId",
        method: "get",
        params: {
            userId: form
        }
    })
}