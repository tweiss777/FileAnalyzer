<script lang="ts" setup>
import Spinner from './Spinner.vue';
import { ref } from 'vue';
import tableResults from '../mock-data/tableResults';
import Data from './Data.vue';
const table = ref(Object.entries(tableResults));
defineProps<{ loading: boolean }>();
</script>

<template>
  <!-- todo: show loading -->
  <div class="flex">
    <div class="mx-auto" v-if="loading">
      <Spinner />
    </div>
    <!-- else show results...-->
    <div v-else class="flex flex-col gap-5 w-full">
      <Data :table="table" />
    </div>
  </div>
</template>
