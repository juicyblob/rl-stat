<script setup lang="ts">
import Panel from '../common/Panel.vue';
import MatchesTable from '../match/MatchesTable.vue';

</script>

<template>
    <Panel title="Last Games">
        <MatchesTable select="last" />
    </Panel>
</template>