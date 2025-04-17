<script setup >
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import Button from '@/components/Button/Button.vue'

</script>
<template>
    <Tooltip content="I appear with delay" :open-delay="2000" :close-delay="2000">
        <Button>Hover slowly</Button>
    </Tooltip>
</template>
