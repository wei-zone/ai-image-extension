<script lang="ts">
import { getCache } from './utils'

export default defineComponent({
    setup() {
        const dialogVisible = ref<boolean>(false)
        const cache = ref<string>('')
        const handleOpen = async () => {
            dialogVisible.value = true
            const data = await getCache('key1')
            cache.value = data.result
        }

        const handleClose = () => {
            dialogVisible.value = false
        }
        return {
            cache,
            dialogVisible,
            handleClose,
            handleOpen
        }
    }
})
</script>

<template>
    <div class="ai-content" data-root="true">
        <el-button type="primary" @click="handleOpen">设置</el-button>
        <el-dialog v-model="dialogVisible" :before-close="handleClose" title="Tips" width="30%">
            <span>This is a test message for ContentScript - {{ cache }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.ai-content {
    position: fixed;
    top: 68px;
    right: 36px;
    z-index: 1000;
}
</style>
