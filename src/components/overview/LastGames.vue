<script setup lang="ts">
import Panel from '../Panel.vue';
import MatchesTable from '../MatchesTable.vue';

</script>

<template>
    <Panel title="Last Games">
        <MatchesTable select="last" />
    </Panel>
</template>