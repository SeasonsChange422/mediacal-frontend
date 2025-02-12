<template>
    <div style="height: 20px;"></div>
    <v-card class="mx-auto" max-width="800">
        <v-card-text class="pt-4">
            <h2 class="mb-4">近期注意：</h2>
            <v-list>
                <v-list-item v-for="therapy in recommendList" :key="therapy">
                    {{therapy}}
                </v-list-item>
            </v-list>
            <!-- <h5 class="mb-3">更新时间：{{ therapy.updateTime }}</h5> -->
        </v-card-text>

    </v-card>

    <div v-for="symptom in symptomList" :key="symptom.id">
        <Record :symptom="symptom"></Record>
    </div>
    <div style="height: 20px;"></div>
</template>
<script setup>
import { ref } from 'vue';
import { getSymptomList } from '@/api/symptomApi'
import { getRecommendTherapy } from '@/api/recommendApi'
import Record from '@/components/Record.vue';
import { onMounted } from 'vue';
const symptomList = ref([

])
const recommendList = ref([])
const user = ref({

})
user.value = JSON.parse(localStorage.getItem('user'))
onMounted(() => {
    getSymptomList().then((res) => {
        if (res.code == 200) {
            symptomList.value = res.data
            symptomList.value.reverse()
            getRecommendTherapy(symptomList.value[0]).then((res) => {
                if (res.code == 200) {
                    recommendList.value = res.data
                }
            })
        }
    })
})

</script>