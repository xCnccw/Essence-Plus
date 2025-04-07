<script setup lang="ts">
import Tooltip from '@/components/tooltip/tooltip.vue'
import Button from '@/components/Button/Button.vue'

</script>
<template>
    <div class="demo-trigger">
        <Tooltip content="Click to toggle" trigger="click">
            <Button>Click me</Button>
        </Tooltip>
        <Tooltip content="Hover to toggle" trigger="hover">
            <Button>Hover me</Button>
        </Tooltip>
    </div>
</template>

<style scoped>
.demo-trigger {
    display: flex;
    gap: 20px;
    /* 按钮间距 */
    padding: 20px;
    flex-direction: row;
    justify-content: left;
    align-items: center;
}
</style>