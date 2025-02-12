/*
 * @Author: Dhx
 * @Date: 2025-02-08 16:34:49
 * @Description: 
 * @FilePath: \medical-frontend\src\api\symptomApi.js
 */
import request from "@/utils/request";
export function newSymptom(form){
    return request({
        url: "/symptom/newSymptom",
        method: "post",
        data:form
    });
}
export function getSymptomList(){
    return request({
        url: "/symptom/getSymptomList",
        method: "get"
    })
}