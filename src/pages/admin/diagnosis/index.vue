<!--
 * @Author: Dhx
 * @Date: 2025-02-11 18:35:29
 * @Description: 
 * @FilePath: \medical-frontend\src\pages\admin\diagnosis\index.vue
-->
<template>
    <div style="min-height: calc(100vh - 100px);">

        <v-data-table-virtual :headers="headers" :items="symptomList">
            <template v-slot:item.actions="{ item }">
                <v-btn size="small" color="primary" variant="text" @click="showDetail(item)">
                    详情
                </v-btn>
            </template>
        </v-data-table-virtual>


        <v-dialog v-model="detailDialog" max-width="600">
            <v-card v-if="selectedSymptom">
                <v-card-title class="headline">症状详情</v-card-title>
                <v-card-text>
                    <v-list dense>
                        <!-- 用户信息 -->
                        <v-list-item>
                            <v-list-item-content>
                                <v-row>
                                    <v-col cols="6">
                                        <strong>姓名:</strong> {{ selectedSymptom.user.name }}
                                    </v-col>
                                    <v-col cols="6">
                                        <strong>电话:</strong> {{ selectedSymptom.user.phone }}
                                    </v-col>
                                    <v-col cols="6">
                                        <strong>年龄:</strong>
                                        {{ calculateAge(selectedSymptom.user.birthday) }}岁
                                    </v-col>
                                    <v-col cols="6">
                                        <strong>时间:</strong>
                                        {{ selectedSymptom.symptom.createTime }}
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>

                        <!-- 症状列表 -->
                        <v-list-item v-for="(value, key) in symptomStatus" :key="key">
                            <v-list-item-title>{{ key }}</v-list-item-title>
                            <v-list-item-icon>
                                <v-icon :color="value ? 'red' : 'green'">
                                    {{ value ? 'mdi-close-circle' : 'mdi-check-circle' }}
                                </v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item>
                            <v-textarea label="医生诊断" variant="outlined" v-model="diagnosisDesc"></v-textarea>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="saveDiagnosis" v-if="diagnosisDesc&&diagnosisDesc!=''">保存</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="detailDialog = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
    <v-snackbar v-model="snackbar.model" :timeout="2000" multi-line :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>
<script setup>
import { ref } from 'vue'
import { getSymptomListWithoutDiagnosis,addDiagnosis } from '@/api/adminApi'
import { onMounted } from 'vue'
import router from '@/router'
const headers = [
    { title: '姓名', key: 'user.name' },
    { title: '时间', key: 'symptom.createTime' },
    { title: '操作', key: 'actions', sortable: false }
]
const detailDialog = ref(false)
const selectedSymptom = ref({})
const symptomList = ref([])
const diagnosisDesc = ref('')
let snackbar = ref({
    model: false,
    text: '',
    color: ''
})
const showDetail = function (item) {
    selectedSymptom.value = item
    detailDialog.value = true
    symptomStatus.value = {
        '疲倦': this.selectedSymptom.symptom.tiredness,
        '干咳': this.selectedSymptom.symptom.dryCough,
        '呼吸困难': this.selectedSymptom.symptom.difficultyInBreathing,
        '喉咙痛': this.selectedSymptom.symptom.soreThroat,
        '疼痛': this.selectedSymptom.symptom.pains,
        '鼻塞': this.selectedSymptom.symptom.nasalCongestion,
        '流鼻涕': this.selectedSymptom.symptom.runnyNose
    }
    
}
const symptomStatus = ref({})
const saveDiagnosis = function() {
    let diagnosis = {
        symptomId: selectedSymptom.value.symptom.id,
        description: diagnosisDesc.value
    }
    addDiagnosis(diagnosis).then((res)=>{
        if(res.code == 200) {
            snackbar.value.color = 'success',
            snackbar.value.text = res.msg
            snackbar.value.model = true
            setTimeout(()=>{
                router.go(0)
            },2000)
        }
    })
    detailDialog.value = false
}

const calculateAge = function (birthday) {
    const birthDate = new Date(birthday)
    const ageDifMs = Date.now() - birthDate.getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
}
const formatDate = function (dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('zh-CN', options)
}
onMounted(() => {
    getSymptomListWithoutDiagnosis().then((res) => {
        if (res.code == 200) {
            symptomList.value = res.data
        }
    })
})
</script>