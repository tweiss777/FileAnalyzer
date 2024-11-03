<script setup lang="ts">
defineProps<{
  table: string[][];
}>();
</script>
<template>
  <!-- else show results...-->
  <div class="flex flex-col gap-5 w-full">
    <h1 class="text-3xl">Results</h1>
    <!-- todo: v-for the result -->
    <div v-for="[label, result] in table" class="flex flex-col w-full">
      <div class="flex flex-col md:flex-row md:justify-start flex-wrap">
        <!-- table label-->
        <div class="text-ellipsis md:w-1/2 text-left">
          <h2 class="text-2xl">{{ label }}</h2>
        </div>
        <!-- table data-->
        <div
          class="w-full sm:w-1/2 lg:w-2/3 text-left overflow-hidden break-words whitespace-normal"
        >
          <h2 class="text-2xl">{{ result }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
