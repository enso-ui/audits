<template>
    <div class="audit-wrapper">
        <div class="columns is-centered is-multiline">
            <div class="column is-narrow">
                <EnsoSelectFilter class="box audit"
                    compact
                    :options="enums.auditEvent._select()"
                    :placeholder="i18n('Action')"
                    v-model="filters.audits.event"/>
            </div>
            <div class="column is-narrow">
                <EnsoSelectFilter class="box model"
                    compact
                    source="system.audit.models"
                    track-by="value"
                    label="label"
                    :name="i18n('Model')"
                    :placeholder="i18n('Model')"
                    v-model="filters.audits.auditable_type"/>
            </div>
            <div class="column is-narrow">
                <EnsoInputFilter class="box id"
                    compact
                    :name="i18n('ID')"
                    :label="i18n('ID')"
                    v-model="filters.audits.auditable_id"/>
            </div>
        </div>
        <EnsoTable class="box p-0"
            v-model:filters="filters"
            :filter-version="1.2"
            id="audits">
            <template #event="{ column, row }">
                <span class="tag is-clickable"
                    :class="cssClass(row.event)"
                    @click="filters.audits.event = row.event">
                    {{ column.enum._get(row.event) }}
                </span>
            </template>
            <template #auditable_type="{ row }">
                <span class="tag is-dark is-clickable"
                    @click="filters.audits.auditable_type = row.auditable_type">
                    {{ row.auditable_type }}
                </span>
            </template>
            <template #auditable_id="{ row }">
                <span class="tag is-info is-clickable"
                    @click="filters.audits.auditable_id = row.auditable_id">
                    {{ row.auditable_id }}
                </span>
            </template>
            <template #changes="{ row }">
                <div class="is-flex is-justify-content-center">
                    <Audit :event="row.event"
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
import { inject, ref } from 'vue';
import { EnsoInputFilter, EnsoSelectFilter } from '@enso-ui/filters/bulma';
import { enums as useEnums } from '@enso-ui/enums/src/pinia/enums';
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';
import Audit from './components/Audit.vue';

const i18n = inject('i18n');

const { enums } = useEnums();

const filters = ref({
    audits: {
        event: null,
        auditable_type: null,
        auditable_id: null,
    },
});

const cssClass = type => {
    switch (`${type}`) {
    case enums.auditEvent.Created:
        return 'is-success';
    case enums.auditEvent.Updated:
        return 'is-warning';
    case enums.auditEvent.Deleted:
        return 'is-danger';
}};

</script>

<style lang="scss">
.audit-wrapper {
    .select-filter.audit {
        width: 15em;
    }
    .select-filter.model {
        width: 25em;
    }
    .input-filter.id {
        width: 10em;
    }
}
</style>
