<script setup lang="ts">
const emits = defineEmits<{
  (e: 'setFile', file: any): void;
  (e: 'upload'): void;
}>();
function handleFileChange(e: any) {
  emits('setFile', e.target.files[0]);
}
function handleSubmit() {
    emits('upload');
}
</script>
<template>
  <div class="flex flex-col sm:flex-row sm:justify-center gap-4">
    <input
      @change="handleFileChange"
      type="file"
      class="text-gray-600 text-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition w-full"
    />
    <button
      class="bg-blue-500 hover:bg-blue-800 transition text-white font-bold py-2 px-4 rounded-full"
      @click="handleSubmit"
    >
      Upload
    </button>
  </div>
</template>
