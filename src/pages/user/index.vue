<template>
    <div style="height: 100px;"></div>
    <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-h5">
            个人信息
            <v-btn v-if="!isEdit" icon="mdi-pencil" variant="text" @click="enterEditMode" class="ml-2"></v-btn>
        </v-card-title>

        <!-- 查看模式 -->
        <v-list v-if="!isEdit" lines="two">
            <v-list-item>
                <v-list-item-title>用户名</v-list-item-title>
                <v-list-item-subtitle>{{ userInfo.username }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>性别</v-list-item-title>
                <v-list-item-subtitle>{{ formatGender(userInfo.gender) }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>姓名</v-list-item-title>
                <v-list-item-subtitle>{{ userInfo.name }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>生日</v-list-item-title>
                <v-list-item-subtitle>{{ userInfo.birthday }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>手机号</v-list-item-title>
                <v-list-item-subtitle>{{ userInfo.phone }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>

        <!-- 编辑模式 -->
        <v-form v-else ref="form" @submit.prevent="save">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="editUserInfo.username" label="用户名" required
                            :rules="usernameRules"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-select v-model="editUserInfo.gender" :items="genderOptions" label="性别" item-title="text"
                            item-value="value"></v-select>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="editUserInfo.name" label="姓名" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-date-picker v-model="editUserInfo.birthday" label="生日" required max="2025-02-13"
                            min="1900-01-01"></v-date-picker>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-text-field v-model="editUserInfo.phone" label="手机号" required
                            :rules="phoneRules"></v-text-field>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-btn color="primary" type="submit">保存</v-btn>
                    <v-btn @click="cancelEdit">取消</v-btn>
                </v-card-actions>
            </v-container>
        </v-form>
    </v-card>
    <div style="height: 100px;"></div>
</template>

<script setup>
import { ref } from 'vue';
import { parseString2Date, parseDate2String } from '@/utils/date'
import { updateUserInfo } from '@/api/userApi'
import router from '@/router';

// 初始用户数据
const userInfo = ref(JSON.parse(localStorage.getItem('user')))
const editUserInfo = ref({});
const isEdit = ref(false);
const form = ref(null);

const genderOptions = [
    { text: '未知', value: 0 },
    { text: '男', value: 1 },
    { text: '女', value: 2 }
];

const usernameRules = [
    v => !!v || '用户名不能为空',
    v => (v && v.length >= 4) || '用户名至少4个字符'
];

const phoneRules = [
    v => !!v || '手机号不能为空',
    v => /^1[3-9]\d{9}$/.test(v) || '手机号格式不正确'
];

const formatGender = (gender) => {
    return genderOptions.find(item => item.value === gender)?.text || '未知';
};


const enterEditMode = () => {
    editUserInfo.value = JSON.parse(JSON.stringify(userInfo.value))
    editUserInfo.value.birthday = parseString2Date(userInfo.value.birthday)
    isEdit.value = true;
};

const save = async () => {
    const { valid } = await form.value.validate();  //检查表单是否合法
    if (!valid) return;
    updateUserInfoFunction()
};
const updateUserInfoFunction = () => {
    updateUserInfo(editUserInfo.value).then((res) => {
        if (res.code == 200) {
            editUserInfo.value.birthday = parseDate2String(editUserInfo.value.birthday)
            router.go(0) //刷新
        }
    })
}
const cancelEdit = () => {
    isEdit.value = false;
};
</script>

<style scoped>
.mx-auto {
    position: relative;
    padding: 20px;
}
</style>