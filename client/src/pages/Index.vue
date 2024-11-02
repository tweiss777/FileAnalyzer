<script setup lang="ts">
import { Ref, ref } from 'vue';
import FileUpload from '../components/FileUpload.vue';
import Results from '../components/Results.vue';
const file = ref();
const isLoading: Ref<boolean> = ref<boolean>(false);
function setFile(doc: any)
{
    file.value = doc
}
function upload(){
    console.log('upload');
}
</script>
<template>
  <div>
    <h1 class="text-3xl text-black-500">Upload File</h1>
        <FileUpload @set-fle="setFile" @upload="upload"/>
        <Results :loading="true"/>
  </div>
</template>
