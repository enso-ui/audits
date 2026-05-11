<template>
    <div class="message-body p-3">
         <div class="columns is-mobile is-gapless">
            <div class="column is-half">
                <div class="mb-2 is-size-6 has-text-centered">
                    {{ i18n('Before') }}
                </div>
                <div v-for="(value, key) in changes.before"
                    :key="key"
                    class="change-row is-size-7">
                    <span class="m-0">{{ key }} : &nbsp;</span>
                    <span class="has-text-weight-bold">{{ value }}</span>
                </div>
            </div>
            <div class="column is-half p-3">
                <div class="mb-2 is-size-6 has-text-centered">
                    {{ i18n('After') }}
                </div>
                <div
                    v-for="(value, key) in changes.after"
                    :key="key"
                    class="change-row is-size-7">
                    <span class="m-0">{{ key }} : &nbsp;</span>
                    <span class="has-text-weight-bold">{{ value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';

defineProps({
    changes: {
        type: [Object, Array],
        required: true,
    },
});



const i18n = inject('i18n');
</script>