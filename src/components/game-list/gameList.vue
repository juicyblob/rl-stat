<script setup lang="ts">
import Panel from '../Panel.vue';
import FilterSelect from '../FilterSelect.vue';
import MatchesTable from '../MatchesTable.vue';
import type { MatchesSort } from '@/constants';
import { ref } from 'vue';

const currentSort = ref<MatchesSort | string>('date');

const filterOptions = [
    { value: 'date', label: 'Date' },
    { value: 'result', label: 'Result'},
    { value: 'mode', label: 'Mode'}
];

function updateSort(value: string) {
    currentSort.value = value;
}

</script>

<template>
    <Panel title="Game List">
        <template #filters>
            <FilterSelect :options="filterOptions" @update-value="updateSort"/>
        </template>
        <MatchesTable select="list" :sort="currentSort" :pagination="true" />
    </Panel>
</template>