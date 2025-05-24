<template>
  <div class="donut-chart-container">
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="series"
      :height="height"
      :width="width"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface DonutChartProps {
  series: number[];
  labels?: string[];
  height?: number | string;
  width?: number | string;
  colors?: string[];
  title?: string;
  showLegend?: boolean;
  legendPosition?: 'left' | 'right' | 'top' | 'bottom';
}

const props = withDefaults(defineProps<DonutChartProps>(), {
  labels: () => [],
  height: 350,
  width: '100%',
  colors: () => ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
  title: '',
  showLegend: true,
  legendPosition: 'bottom'
});

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  },
  labels: props.labels,
  colors: props.colors,
  title: {
    text: props.title,
    align: 'center',
    style: {
      fontSize: '16px',
      fontWeight: '600',
      fontFamily: 'inherit'
    }
  },
  legend: {
    position: props.legendPosition,
    horizontalAlign: 'center',
    fontSize: '12px',
    fontFamily: 'inherit',
    markers: {
      width: 12,
      height: 12,
      radius: 12
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    },
    show: props.showLegend
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: 'Total',
            fontSize: '16px',
            fontFamily: 'inherit',
            color: '#373d3f',
            formatter: () => {
              return props.series.reduce((a, b) => a + b, 0).toString();
            }
          },
          value: {
            fontSize: '20px',
            fontFamily: 'inherit',
            color: '#373d3f',
            formatter: (val: string) => {
              return val;
            }
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ],
  tooltip: {
    enabled: true,
    y: {
      formatter: (val: number) => {
        return `${val}`;
      }
    }
  }
}));

</script>

<style scoped>
.donut-chart-container {
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark .donut-chart-container {
  background-color: #1e293b;
}
</style>