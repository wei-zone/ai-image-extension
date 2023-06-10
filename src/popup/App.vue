<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Search, Loading } from '@element-plus/icons-vue'
import { answer } from '@/api/chat'
// 关键词
const keyword = ref<string>('')
// 生成图片
const img = ref<string>('')

// 加载中
const loading = ref<boolean>(false)

const handleSearch = async () => {
    try {
        if (loading.value) {
            ElMessage.warning('请耐心等待哦~')
            return
        }
        loading.value = true
        const res = await answer(keyword.value)
        console.log(res)
        if (res.data && res.data[0]?.url) {
            img.value = res.data[0]?.url
        } else {
            ElMessage.warning(res.message || JSON.stringify(res.data?.error?.message))
        }
        loading.value = false
    } catch (e) {
        console.log(e)
        ElMessage.warning('生成失败，请重试')
        loading.value = false
    }
}

onMounted(() => {
    console.log('mounted')
})
</script>

<template>
    <div class="page ai-popup">
        <div class="search-page">
            <div class="search-header">
                <div>
                    <h3>Ai绘图</h3>
                    <h5>输入关键词，绘制你的图片</h5>
                </div>
                <a href="https://github.com/wforguo/aichat" target="_blank" title="源码">
                    <img
                        src="data:image/png;base64,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"
                        alt="https://github.com/wforguo/ai-image"
                    />
                </a>
            </div>
            <el-divider />
            <div v-loading="loading" class="search-res" element-loading-text="努力绘制中...">
                <el-image v-show="img" :src="img" :preview-src-list="[img]" fit="cover">
                    <template #placeholder>
                        <div class="image-placeholder">
                            <el-icon size="32"><Loading /></el-icon>
                        </div>
                    </template>
                </el-image>
                <el-empty v-show="!img" description="输入关键词" />
            </div>
            <div class="search-input">
                <el-input
                    v-model="keyword"
                    :readonly="loading"
                    clearable
                    placeholder="输入关键词，开始绘制"
                    @keyup.enter="handleSearch"
                >
                    <template #suffix>
                        <el-icon v-show="!loading" class="el-input__icon" @click="handleSearch">
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
@keyframes loading {
    0% {
        transform: rotate3d(0, 0, 1, 0);
    }
    100% {
        transform: rotate3d(0, 0, 1, 360deg);
    }
}
.ai-popup {
    overflow: hidden;
    .search-header {
        padding: 16px 16px 0;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h3 {
            font-weight: bold;
        }
    }
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
        @include content-center-flex();
        .el-image {
        }
    }
    .search-input {
        padding: 24px;
    }
    .el-input__icon {
        cursor: pointer;
    }
    .image-placeholder {
        @include content-fill();
        @include content-center-flex();
        animation: loading 2s linear infinite;
    }
}
</style>
