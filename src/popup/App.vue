<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Search, Loading } from '@element-plus/icons-vue'
import { answer } from '@/api/chat'
// 关键词
const keyword = ref<string>('')
// 生成图片
const img = ref<string>('')

const handleSearch = async () => {
    try {
        console.log(keyword.value)
        ElMessage.success('提交成功')
        const res = await answer(keyword.value)
        img.value = res.data[0].url
    } catch (e) {
        console.log(e)
    }
}

onMounted(() => {
    console.log('mounted')
})
</script>

<template>
    <div class="page ai-popup">
        <div class="search-page">
            <div class="search-res">
                <el-scrollbar>
                    <el-image :src="img" :preview-src-list="[img]" fit="cover">
                        <template #placeholder>
                            <div class="image-slot">
                                Loading
                                <el-icon><Loading /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </el-scrollbar>
            </div>
            <div class="search-input">
                <el-input v-model="keyword" placeholder="请输入你的问题" @keyup.enter="handleSearch">
                    <template #suffix>
                        <el-icon class="el-input__icon" @click="handleSearch">
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../assets/css/mixins.scss';
.ai-popup {
    overflow: hidden;
    .search-page {
        @include content-fill();
        display: flex;
        flex-direction: column;
    }
    .search-res {
        flex: 1;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .search-input {
        padding: 24px;
    }
    .el-input__icon {
        cursor: pointer;
    }
}
</style>
