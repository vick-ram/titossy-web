<template>
  <div class="circular-progress">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <path
        class="circle-bg"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        class="circle"
        :stroke-dasharray="`${progress}, 100`"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
    <div class="percentage">{{ progress }}%</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  progress: number;
}>();

const progress = ref(props.progress);

watch(() => props.progress, (newVal) => {
  progress.value = newVal;
});
</script>

<style scoped>
.circular-progress {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100px;
  height: 100px;
}

.circular-chart {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke: #4caf50;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease 0s;
}

.percentage {
  position: absolute;
  font-size: 1.2em;
  font-weight: bold;
}
</style>