<template>
    <div class="wrapper">
        <div class="columns is-centered is-multiline">
            <div class="column is-narrow">
                <EnsoSelectFilter class="box action"
                    compact
                    label="label"
                    track-by="value"
                    :options="eventOptions"
                    :placeholder="i18n('Action')"
                    v-model="filters.audits.event"/>
            </div>
            <div class="column is-narrow">
                <EnsoInputFilter class="box model"
                    compact
                    :name="i18n('Model')"
                    label="Model"
                    v-model="filters.audits.auditable_type"/>
            </div>
        </div>
        <EnsoTable class="box p-0"
            v-model:filters="filters"
            :filter-version="1.2"
            id="audits">
            <template #event="{ column, row }">
                <span class="tag is-warning">
                    {{ column.enum._get(row.event) }}
                </span>
            </template>
            <template #auditable_type="{ row }">
                <span class="tag is-info is-light">
                    {{ modelName(row.auditable_type) }}
                </span>
            </template>
            <template #auditable_id="{ row }">
                <span class="tag is-primary">
                    {{ row.auditable_id }}
                </span>
            </template>
            <template #changes="{ row }">
                <div class="is-flex is-justify-content-center">
                    <Diff :event="row.event"
                        :changes="row.changes"/>
                </div>
            </template>
            <template #createdBy="{ row }">
                <Avatar class="is-24x24"
                    tooltip
                    :user="row.createdBy"
                    v-if="row.createdBy"/>
            </template>
        </EnsoTable>
    </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import { EnsoInputFilter, EnsoSelectFilter } from '@enso-ui/filters/bulma';
import { enums as useEnums } from '@enso-ui/enums/src/pinia/enums';
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';
import Diff from './components/Diff.vue';

const i18n = inject('i18n');

const { enums } = useEnums();

const filters = ref({
    audits: {
        event: null,
        auditable_type: null,
    },
});

const eventOptions = computed(() => enums.auditEvent?._filter() ?? []);

const modelName = auditableType => auditableType?.split('\\').pop() ?? auditableType;

</script>

<style lang="scss">
.wrapper {
    .vue-filter {
        &.action,
        &.model {
            width: 15em;
        }
    }
}
</style>
