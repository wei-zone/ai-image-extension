<script lang="ts" setup>
import { log } from '@/libs/utils'
import { ref } from 'vue'
import { answer } from '@/api/chat'
import { ElMessage } from 'element-plus'

defineProps<{
    msg: string
}>()

const input = ref('')
const result = ref('')
const handleSubmit = () => {
    try {
        answer(input.value).then(res => {
            console.log(res)
            const { code, data, message } = res
            if (code === 200) {
                result.value = data
            } else {
                ElMessage.error(message)
            }
        })
    } catch (e) {
        log.danger(e)
        ElMessage.error('失败，请重试')
    }
}
</script>

<template>
    <div class="greetings">
        <el-row>
            <el-col :span="18">
                <el-input v-model="input" placeholder="input your question" />
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-col>
        </el-row>
        <el-divider />
        <el-card header="结果：">
            {{ result }}
        </el-card>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
}

h3 {
    font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
    text-align: center;
}

@media (min-width: 1024px) {
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>
