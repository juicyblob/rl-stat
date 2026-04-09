<script setup lang="ts">
import { ref } from 'vue';
import FilterSelect from '../FilterSelect.vue';
import Panel from '../Panel.vue';

const series = ref([
    {
        name: 'Goals',
        data: [12, 28, 18, 24, 18, 48, 42],
    }
]);

const chartOptions = {
    chart: {
        type: 'line',
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        selection: {
            enabled: false,
        },
        offsetX: -17,
        dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 7,
        color: '#4ADE80',
        opacity: 0.39
    },
    },

    grid: {
        borderColor: '#404262',
        strokeDashArray: 0,
    },

    stroke: {
        curve: 'straight',
        width: 2,
    },

    colors: ['#4ADE80'],

    markers: {
        size: 4,
        strokeWidth: 1,
        strokeColors: '#ffffff',
        hover: {
            size: 5,
        },
    },

    tooltip: {
        theme: 'dark',
        shared: false,
        intersect: true,
        x: {
            show: false,
        },
        marker: {
            show: false,
        },
        y: {
            formatter: undefined,
            title: {
                formatter: (seriesName: number) => seriesName,
            },
        },
    },

    xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'San'],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false
        },
        labels: {
            style: {
                colors: '#57597A',
                fontSize: '12px',
                fontWeight: 300,
            },
        },
        tickPlacement: 'on',
        tooltip: {
            enabled: false,
        },
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        labels: {
            align: 'left',
            style: {
                colors: '#57597A',
                fontSize: '12px',
                fontWeight: 300,
            },
        },
    },
    
}

</script>

<template>
    <Panel title="Goals Dynamics">
        <template #filters>
            <FilterSelect />
        </template>
        <apexchart height="100%" :options="chartOptions" :series="series"/>
    </Panel>
</template>