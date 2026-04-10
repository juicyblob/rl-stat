<script setup lang="ts">
import IconEdit from '@/assets/icons/IconEdit.vue';
import Panel from '../Panel.vue';
import IconTrash from '@/assets/icons/IconTrash.vue';
import MatchesTable from './MatchesTable.vue';

</script>

<template>
    <Panel title="Last Games">
        <MatchesTable select="last" />
    </Panel>
</template>