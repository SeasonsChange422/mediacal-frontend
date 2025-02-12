<!--
 * @Author: Dhx
 * @Date: 2025-02-12 21:16:56
 * @Description: 
 * @FilePath: \medical-frontend\src\pages\admin\recommend\index.vue
-->
<template>
    <div style="height:100vh">
        <v-data-table-virtual :headers="headers" :items="recommendList">
            <template v-slot:item.therapy="{ item, index }">
                <p v-if="editIndex!=index">{{ item.therapy }}</p>
                <v-textarea v-else variant="outlined" v-model="updateText"></v-textarea>
            </template>
            <template v-slot:item.actions="{ item,index }">
                <v-btn size="small" color="primary" variant="text" @click="edit(index)" v-if="editIndex != index">
                    编辑
                </v-btn>
                <v-btn size="small" color="primary" variant="text" v-if="editIndex == index" @click="save()">
                    保存
                </v-btn>
                <v-btn size="small" color="primary" variant="text" v-if="editIndex == index" @click="editIndex = -1">
                    取消
                </v-btn>
            </template>
        </v-data-table-virtual>
    </div>
    <v-snackbar v-model="snackbar.model" :timeout="2000" multi-line :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>
<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue';
import { getRecommendList,updateRecommend } from '@/api/recommendApi';
const headers = [
    { title: '症状', key: 'symptom' },
    { title: '推荐疗法', key: 'therapy' },
    { title: '操作', key: 'actions', sortable: false }
]
let snackbar = ref({
    model:false,
    text:'',
    color:''
})
const updateText = ref('')
const recommendList = ref([])
const editIndex = ref(-1)
const edit = function(index) {
    editIndex.value = index
    updateText.value = recommendList.value[index].therapy
    console.log(recommendList.value[index])
}
const save = function () {
    recommendList.value[editIndex.value].therapy = updateText.value
    updateRecommend(recommendList.value[editIndex.value]).then((res)=>{
        if(res.code == 200) {
            editIndex.value = -1
            snackbar.value.text = res.msg
            snackbar.value.color = 'success'
            snackbar.value.model = true

        } else {
            snackbar.value.text = res.msg
            snackbar.value.color = 'error'
            snackbar.value.model = true

        }
    })
}
onMounted(() => {
    getRecommendList().then((res)=>{
        if(res.code == 200) {
            recommendList.value = res.data
        }
    })
})
</script>