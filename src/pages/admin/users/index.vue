<!--
 * @Author: Dhx
 * @Date: 2025-02-10 15:09:59
 * @Description: 
 * @FilePath: \medical-frontend\src\pages\admin\users\index.vue
-->
<template>
    <div style="min-height: calc(100vh - 100px);">
        <v-row class="mb-4" dense>
            <v-col cols="12" sm="6">
                <v-text-field v-model="searchName" label="按姓名搜索" clearable prepend-inner-icon="mdi-magnify"
                    variant="outlined"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field v-model="searchPhone" label="按电话搜索" clearable prepend-inner-icon="mdi-phone"
                    variant="outlined"></v-text-field>
            </v-col>
        </v-row>


        <v-data-table-virtual :headers="headers" :items="filteredUsers" :loading="loading" loading-text="正在加载数据...">
            <template v-slot:item.actions="{ item }">
                <v-btn size="small" color="primary" variant="text" @click="showDetail(item)">
                    详情
                </v-btn>
                <v-btn size="small" color="secondary" variant="text" @click="showHistoryDialog(item)">
                    病历
                </v-btn>
                <v-btn size="small" color="secondary" variant="text" @click="showAdminDialog(item)">
                    管理员
                </v-btn>
            </template>
        </v-data-table-virtual>


        <v-dialog v-model="detailDialog" max-width="600">
            <v-card v-if="selectedUser">
                <v-card-title>用户详情</v-card-title>
                <v-card-text>
                    <v-list density="compact">
                        <v-list-item>
                            <template v-slot:prepend>
                                <v-icon>mdi-identifier</v-icon>
                            </template>
                            <v-list-item-title>ID：{{ selectedUser.id }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>用户名：{{ selectedUser.username }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>姓名：{{ selectedUser.name }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>性别：{{ formatGender(selectedUser.gender) }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>生日：{{ selectedUser.birthday }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>电话：{{ selectedUser.phone }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>管理员：{{ selectedUser.isAdmin ? '是' : '否' }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="detailDialog = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="historyDialog" max-width="800">
            <v-card>
                <v-card-title>用户病历</v-card-title>
                <v-card-text>
                    <v-textarea label="个性化治疗建议" variant="outlined" v-model="therapy.therapy"></v-textarea>
                    <v-btn color="primary" @click="updateTherapy"
                        v-if="therapy.therapy != therapy.oldTherapy">更新</v-btn>
                    <div v-for="symptom in symptomList" :key="symptom.id">
                        <Record :symptom="symptom"></Record>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="historyDialog = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="adminDialog" max-width="300">
            <v-card>
                <v-card-title>管理员设置</v-card-title>
                <v-card-text>
                    <p>{{ adminText(selectedUser.admin) }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="setAdminFunction()">确认</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="adminDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <v-snackbar v-model="snackbar.model" :timeout="2000" multi-line :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getUserList, setAdmin, getSymptomListByUserId, getTherapyByUserId, editTherapy, addTherapy } from '@/api/adminApi'
import router from '@/router'
const headers = [
    { title: '姓名', key: 'name' },
    { title: '电话', key: 'phone' },
    { title: '操作', key: 'actions', sortable: false }
]
let snackbar = ref({
    model: false,
    text: '',
    color: ''
})
const users = ref([])
const loading = ref(false)
const searchName = ref('')
const searchPhone = ref('')
const detailDialog = ref(false)
const historyDialog = ref(false)
const selectedUser = ref(null)
const adminDialog = ref(false)
const symptomList = ref([])
const therapy = ref({
    userId: 0,
    therapy: '',
    oldTherapy: ''
})
onMounted(() => {
    getUserList().then((res) => {
        if (res.code == 200) {
            users.value = res.data
        }
    })
})

// 搜索用户
const filteredUsers = computed(() => {
    if (searchName.value == '' && searchPhone.value == '') { //未输入则展示全部用户
        return users.value
    }
    return users.value.filter(user => {
        const nameMatch = user.name?.toLowerCase().includes(searchName.value.toLowerCase()) ?? false
        const phoneMatch = user.phone?.includes(searchPhone.value) ?? false
        return nameMatch && phoneMatch
    })
})

function showDetail(user) {
    selectedUser.value = user
    detailDialog.value = true
}

function showHistoryDialog(user) {
    selectedUser.value = user
    therapy.value.userId = user.id
    getTherapyByUserId(user.id).then((res) => {
        if (res.code == 200) {
            therapy.value = res.data
            therapy.value.oldTherapy = therapy.value.therapy
        }
    })
    getSymptomListByUserId(selectedUser.value.id).then((res) => {
        if (res.code == 200) {
            symptomList.value = res.data
            symptomList.value.reverse()
        }
    })
    historyDialog.value = true
}

function showAdminDialog(user) {
    selectedUser.value = user
    adminDialog.value = true
}
function formatGender(gender) {
    return gender === 1 ? '男' : gender === 2 ? '女' : '未知'
}

function adminText(admin) {
    return admin === true ? '取消管理员' : '确定将该用户设为管理员？'
}

function setAdminFunction() {
    setAdmin(selectedUser.value.id).then((res) => {
        if (res.code == 200) {
            snackbar.value.color = 'success'
            snackbar.value.text = res.msg
            snackbar.value.model = true
        } else {
            snackbar.value.color = 'error'
            snackbar.value.text = res.msg
            snackbar.value.model = true
        }
    })
}
const updateTherapy = function () {
    if (!therapy.value.id) { //原本没有旧新建
        addTherapy(therapy.value).then((res) => {
            if (res.code == 200) {
                snackbar.value.color = 'success'
                snackbar.value.text = res.msg
                snackbar.value.model = true
                setTimeout(()=>{
                    router.go(0)
                },2000)
            } else {
                snackbar.value.color = 'error'
                snackbar.value.text = res.msg
                snackbar.value.model = true
            }
        })
    } else {
        editTherapy(therapy.value).then((res) => { //有就更新原来的
            if (res.code == 200) {
                snackbar.value.color = 'success'
                snackbar.value.text = res.msg
                snackbar.value.model = true
                setTimeout(()=>{
                    router.go(0)
                },2000)
            } else {
                snackbar.value.color = 'error'
                snackbar.value.text = res.msg
                snackbar.value.model = true
            }
        })
    }

}
</script>