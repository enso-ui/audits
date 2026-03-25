<template>
    <EnsoTable class="box is-paddingless raises-on-hover"
        id="audits">
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
</template>

<script setup>
import { EnsoTable } from '@enso-ui/tables/bulma';
import Avatar from '@enso-ui/users/src/bulma/pages/users/components/Avatar.vue';
import Diff from './components/Diff.vue';
</script>

<style lang="scss">
</style>
