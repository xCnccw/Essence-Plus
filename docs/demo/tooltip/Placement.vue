<script setup lang="ts">
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'

</script>
<template>
    <div class="demo-placement">
        <Tooltip content="Top" placement="top">
            <Button style="width: 100px;height: 100px;">Top</Button>
        </Tooltip>
        <Tooltip content="Top-Start" placement="bottom-start">
            <Button style="width: 100px;height: 100px;">Top Start</Button>
        </Tooltip>
        <Tooltip content="Right-End" placement="right-end">
            <Button style="width: 100px;height: 100px;">Right End</Button>
        </Tooltip>
    </div>
</template>

<style scoped>
.demo-placement {
    display: flex;
    gap: 20px; /* 按钮间距 */
    padding: 20px;
    flex-direction: row; 
    justify-content: left;
    align-items: center;
}
</style>

