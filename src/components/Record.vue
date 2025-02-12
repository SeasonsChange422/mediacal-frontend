<!--
 * @Author: Dhx
 * @Date: 2025-02-08 17:15:02
 * @Description: 
 * @FilePath: \medical-frontend\src\components\Record.vue
-->
<template>
    <v-card class="mx-auto card" max-width="800">
        <v-card-text class="pt-4">
            <h3 class="mb-4">症状：</h3>
            <v-row>
                <v-col cols="12" md="6">
                    <v-checkbox v-model="localSymptom.tiredness" label="1. 异常疲劳" color="primary" hide-details
                        :disabled="true"></v-checkbox>

                    <v-checkbox v-model="localSymptom.dryCough" label="2. 干咳" color="primary" hide-details
                        :disabled="true"></v-checkbox>

                    <v-checkbox v-model="localSymptom.difficultyInBreathing" label="3. 呼吸困难" color="primary"
                        hide-details :disabled="true"></v-checkbox>

                    <v-checkbox v-model="localSymptom.soreThroat" label="4. 喉咙痛" color="primary" hide-details
                        :disabled="true"></v-checkbox>
                </v-col>

                <v-col cols="12" md="6">
                    <v-checkbox v-model="localSymptom.pains" label="5. 身体疼痛" color="primary" hide-details
                        :disabled="true"></v-checkbox>

                    <v-checkbox v-model="localSymptom.nasalCongestion" label="6. 鼻塞" color="primary" hide-details
                        :disabled="true"></v-checkbox>

                    <v-checkbox v-model="localSymptom.runnyNose" label="7. 流鼻涕" color="primary" hide-details
                        :disabled="true"></v-checkbox>

                    <v-checkbox v-model="localSymptom.noExperiencing" label="8. 无体验" color="primary" hide-details
                        :disabled="true"></v-checkbox>
                </v-col>
            </v-row>
            <h5 class="mb-4">时间：{{ localSymptom.createTime }}</h5>
        </v-card-text>
        <v-card-text class="pt-4">
            <h3 class="mb-4">初步诊断：</h3>
            <h5 class="mb-4">{{ localSymptom.severityNone == true ? '未患有哮喘' : '患有哮喘' }}</h5>
            <h3 class="mb-4" v-if="diagnosis.id!=0">医生诊断：</h3>
            <h5 class="mb-4" v-if="diagnosis.id!=0">{{ diagnosis.description }}</h5>
            <h5 class="mb-4" v-if="diagnosis.id!=0">时间：{{ diagnosis.createTime }}</h5>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="clickRating" v-if="feedback.diagnosisId != 0">评价</v-btn>
        </v-card-actions>
        <v-dialog v-model="ratingDialog" max-width="800">
            <v-card>
                <v-card-title>评价</v-card-title>
                <v-card-text>
                    <v-rating hover :length="5" :size="48" :model-value="feedback.score" active-color="primary"
                        :readonly="feedback.id" @update:model-value="(item)=>{feedback.score = item}"/>
                    <v-textarea label="反馈" variant="outlined" v-model="feedback.feedback"
                        :disabled="feedback.id"></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="saveRating" :disabled="feedback.id">保存</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="ratingDialog = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
    <v-snackbar v-model="snackbar.model" :timeout="2000" multi-line :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>
<script setup>
import { onMounted } from 'vue';
import { getDiagnosisBySymptomId } from '@/api/adminApi'
import { getFeedbackByDiagnosisId, newFeedback } from '@/api/feedbackApi'
import { ref } from 'vue';
import router from '@/router';
const props = defineProps({
    symptom: {}
})
const localSymptom = ref({

})
const diagnosis = ref({

})
let snackbar = ref({
    model: false,
    text: '',
    color: ''
})
const ratingDialog = ref(false)
const clickRating = function () {
    ratingDialog.value = true
}
const feedback = ref({
    diagnosisId: 0,
    score: 0,
    feedback: ''
})
const saveRating = function () {
    newFeedback(feedback.value).then((res) => {
        if (res.code == 200) {
            snackbar.value.color = 'success'
            snackbar.value.text = res.msg
            snackbar.value.model = true
            ratingDialog.value = false
            setTimeout(()=>{
                router.go(0)
            },2000)
        }
    })
}
onMounted(() => {
    localSymptom.value = props.symptom
    getDiagnosisBySymptomId(localSymptom.value.id).then((res) => {
        if (res.code == 200) {
            diagnosis.value = res.data
            feedback.value.diagnosisId = diagnosis.value.id


            getFeedbackByDiagnosisId(diagnosis.value.id).then((res) => {
                if (res.code == 200) {
                    feedback.value = res.data
                }
            })
        }
    })
})
</script>
<style scoped>
.card {
    margin-top: 40px;
}
</style>