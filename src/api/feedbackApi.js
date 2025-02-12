/*
 * @Author: Dhx
 * @Date: 2025-02-12 16:12:15
 * @Description: 
 * @FilePath: \medical-frontend\src\api\feedbackApi.js
 */
import request from "@/utils/request";
export function getFeedbackByDiagnosisId(form){
    return request({
        url: "/feedback/getFeedbackByDiagnosisId",
        method: "get",
        params: {
            diagnosisId: form
        }
    })
}
export function newFeedback(form){
    return request({
        url: "/feedback/newFeedback",
        method: "post",
        data: form
    })
}