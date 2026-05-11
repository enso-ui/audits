<template>
    <Dropdown :triggers="['click']"
        ref="dropdown">
        <template #popper>
            <article class="audit-popover message"
                :class="cssClass">
                <div class="message-header">
                    <p>{{ events._get(event) }}</p>
                    <button class="delete"
                        aria-label="delete"
                        @click.stop="dropdown?.hide()"/>
                </div>
                <component :is="component"
                    v-bind="$attrs"/>
            </article>
        </template>
        <button class="button is-naked is-small">
            <span class="icon">
                <Fa icon="eye"/>
            </span>
        </button>
    </Dropdown>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Dropdown } from 'v-tooltip';
import { enums } from '@enso-ui/enums/src/pinia/enums';
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Model from './Model.vue';
import Updated from './Updated.vue';

library.add(faEye);

const props = defineProps({
    event: {
        type: [Number, String],
        required: true,
    },
});

const dropdown = ref(null);

const events = enums().enums.auditEvent;

const component = computed(() => `${props.event}` === events.Updated ? Updated : Model);
const cssClass = computed(() => {
    switch (`${props.event}`) {
        case events.Created:
            return 'is-success';
        case events.Updated:
            return 'is-warning';
        case events.Deleted:
            return 'is-danger';
    };
});
</script>

<style lang="scss">
.audit-popover {
    max-width: 35em;
    min-width: 0em;
    .header {
        background-color: var(--bulma-card-header-background-color);
    }
}

</style>
