<script setup lang="ts">
import { ref } from 'vue';
import FileUpload from '../components/FileUpload.vue';
const file = ref();
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
  </div>
</template>
