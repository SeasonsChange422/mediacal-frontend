<template>
    <v-container class="pa-6">
        <v-card class="mx-auto" max-width="800">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>健康症状调查表</v-toolbar-title>
            </v-toolbar>

            <v-card-text class="pt-4">
                <h3 class="mb-4">请选择您最近体验的症状（可多选）：</h3>

                <v-row>
                    <v-col cols="12" md="6">
                        <v-checkbox v-model="formData.tiredness" label="1. 异常疲劳" color="primary"
                            hide-details></v-checkbox>

                        <v-checkbox v-model="formData.dryCough" label="2. 干咳" color="primary" hide-details></v-checkbox>

                        <v-checkbox v-model="formData.difficultyInBreathing" label="3. 呼吸困难" color="primary"
                            hide-details></v-checkbox>

                        <v-checkbox v-model="formData.soreThroat" label="4. 喉咙痛" color="primary"
                            hide-details></v-checkbox>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-checkbox v-model="formData.pains" label="5. 身体疼痛" color="primary" hide-details></v-checkbox>

                        <v-checkbox v-model="formData.nasalCongestion" label="6. 鼻塞" color="primary"
                            hide-details></v-checkbox>

                        <v-checkbox v-model="formData.runnyNose" label="7. 流鼻涕" color="primary"
                            hide-details></v-checkbox>

                        <v-checkbox v-model="formData.noExperiencing" label="8. 无体验" color="primary"
                            hide-details></v-checkbox>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="justify-end pa-4">
                <v-btn color="primary" @click="submitForm">
                    提交
                </v-btn>
            </v-card-actions>
        </v-card>

        <!-- 结果展示 -->
        <v-dialog v-model="showResult" max-width="500">
            <v-card>
                <v-card-title class="text-h5">评估结果</v-card-title>
                <v-card-text>
                    <div v-html="assessmentResult"></div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="showResult = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
    <v-snackbar v-model="snackbar.model" :timeout="2000" multi-line :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { newSymptom} from '@/api/symptomApi'
onMounted(()=>{
    if(localStorage.getItem('token')==null){
        router.push('/login')
    }
    let user = JSON.parse(localStorage.getItem('user'))
    if(user.name == '' || user.name == 0 || user.phone == ''){
        router.push('/user')
    }
})
let snackbar = ref({
    model:false,
    text:'',
    color:''
})
const formData = ref({
    tiredness: false,
    dryCough: false,
    difficultyInBreathing: false,
    soreThroat: false,
    pains: false,
    nasalCongestion: false,
    runnyNose: false,
    noExperiencing: false,
});

const showResult = ref(false);
const assessmentResult = ref('');

const submitForm = () => {
    newSymptom(formData.value).then((res)=>{
        if(res.code == 200) {
            snackbar.value.model = true
            snackbar.value.text="上传成功"
            snackbar.value.color="success"
            setTimeout(()=>{
                router.push("/")
            },2000)
        } else {
            snackbar.value.model = true
            snackbar.value.text = res.msg
            snackbar.value.color="error"
        }
    })
};

</script>

<style scoped>
.v-card {
    margin-top: 2rem;
}

.text-error {
    color: #ff5252;
    font-weight: bold;
}

.text-warning {
    color: #fb8c00;
}

.text-success {
    color: #4caf50;
}

.text-info {
    color: #2196f3;
}
</style>