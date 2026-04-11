<script setup lang="ts">
import { computed, ref } from 'vue';
import Panel from '../Panel.vue';
import FilterSelect from '../FilterSelect.vue';

const { win_rate = 68 } = defineProps<{ win_rate: number }>();

const percent = computed(() => {
    return `${win_rate}%`;
});

const filterOptions = [
    { value: 'all', label: 'All time' },
    { value: 'month', label: 'Month'}
];

const series = ref([win_rate]);

const chartOptions = ref({
    chart: {
        type: 'radialBar',
        offsetX: 0,
        offsetY: 0,
        sparkline: {
            enabled: true,
        },
    },
    colors: ["#4ADE80"],

    plotOptions: {
        radialBar: {
            startAngle: -170,
            endAngle: 240,
            hollow: {
                size: '38%',
            },
            track: {
                background: '#F97316',
                startAngle: -170,
                endAngle: 240,
                dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 6,
                    color: '#4ADE80',
                    opacity: 0.39
                }
            },
            dataLabels: {
                name: {
                    show: false
                },
                value: {
                    show: false
                }
            },
        }
    },
    
    states: {
        hover: {
            filter: {
                type: 'none'
            }
        },
        active: {
            filter: {
                type: 'none'
            }
        }
    },
});
</script>

<template>
    <Panel title="Win Rate">
        <template #filters>
            <FilterSelect :options="filterOptions"/>
        </template>
        <div class="flex flex-col items-end h-full pt-6.5">
            <div class="flex flex-col gap-2 w-18.5">
                <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full bg-(--color-green) shrink-0"></div>
                    <span class="text-xs/[1]">Victories</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-2.5 h-2.5 rounded-full bg-(--color-orange) shrink-0"></div>
                    <span class="text-xs/[1]">Defeats</span>
                </div>
            </div>
            <span class="font-(family-name:--font-jetbrains) text-[2.5rem]/[1] font-bold mt-auto pb-7.5">{{ percent }}</span>
        </div>
        <apexchart class="absolute -top-3.5 -left-10" tabindex="-1" type="radialBar" width="262" height="262" :options="chartOptions" :series="series"></apexchart>
    </Panel>
    
</template>