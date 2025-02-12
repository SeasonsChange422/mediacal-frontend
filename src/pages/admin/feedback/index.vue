<template>
    <div style="height:100vh">
        <v-data-table-virtual :headers="headers" :items="feedbackList">
            <template v-slot:item.score="{ item }">
                <v-rating hover :length="5" :size="32" :model-value="item.score" active-color="primary" readonly />
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn size="small" color="primary" variant="text" @click="showDetail(item)">
                    详情
                </v-btn>
            </template>
        </v-data-table-virtual>
        <v-dialog v-model="detailDialog" max-width="500">
            <v-card>
                <v-card-title>详情</v-card-title>
                <v-card-text>
                    <v-list dense>
                        <v-list-item>
                            <strong>姓名:</strong> {{ user.name }}
                        </v-list-item>
                        <v-list-item>
                            <strong>电话:</strong> {{ user.phone }}
                        </v-list-item>
                        <v-list-item>
                            <strong>时间:</strong>
                                        {{ selectedFeedback.createTime }}
                        </v-list-item>
                        <v-list-item>
                            <strong>评分：</strong>
                            <br>
                            <v-rating hover :length="5" :size="32" :model-value="selectedFeedback.score" active-color="primary" readonly />
                        </v-list-item>
                        <v-list-item>
                            <strong>反馈：</strong>
                            <p>{{ selectedFeedback.feedback }}</p>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="detailDialog = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue';
import { getFeedbackList,getUserInfoById } from '@/api/adminApi'
const headers = [
    { title: '评分', key: 'score' },
    { title: '反馈', key: 'feedback' },
    { title: '时间', key: 'createTime' },
    { title: '操作', key: 'actions', sortable: false }
]
const feedbackList = ref([])
const detailDialog = ref(false)
const selectedFeedback = ref({})
const user = ref({})
const showDetail = function(item) {
    selectedFeedback.value = item
    detailDialog.value = true
    getUserInfoById(selectedFeedback.value.userId).then((res)=>{
        if(res.code == 200){ 
            user.value = res.data
        }
    })
}
onMounted(() => {
    getFeedbackList().then((res) => {
        if (res.code == 200) {
            feedbackList.value = res.data
        }
    })
})
</script>