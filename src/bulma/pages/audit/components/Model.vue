<template>
    <div class="message-body p-3">
        <div v-for="(value, key) in changes"
            :key="key"
            class="is-size-7">
            <span class="m-0">{{ key }} : &nbsp;</span>
            <span class="has-text-weight-bold">{{ value }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    changes: {
        type: [Object, Array],
        required: true,
    },
});
</script>