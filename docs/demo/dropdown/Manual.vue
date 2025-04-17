<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/Dropdown/Dropdown.vue'
import Button from '@/components/Button/Button.vue'

const dropdownRef = ref()
const options = ref([
    { key: 1, label: 'Option 1' },
    { key: 2, label: 'Option 2' }
])
</script>

<template>
    <Dropdown ref="dropdownRef" :menuOption="options" placement="top" manual>
        <template #default>
            <Button>Manual Control</Button>
        </template>
    </Dropdown>
    <div class="demo-manual">
        <Button type="success" @click="dropdownRef?.show()">Show</Button>
        <Button type="danger" @click="dropdownRef?.hide()">Hide</Button>
    </div>

</template>

<style scoped>
.demo-manual {
    display: flex;
    margin-top: 10px;
}
</style>