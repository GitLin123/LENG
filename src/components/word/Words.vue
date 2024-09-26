<template>
<div class="main">
    <el-tabs type="card">
        <el-tab-pane label="查单词"><SearchWord></SearchWord></el-tab-pane>
        <el-tab-pane label="背单词">背单词</el-tab-pane>
        <el-tab-pane label="听单词">听单词</el-tab-pane>
        <el-tab-pane label="写单词">写单词</el-tab-pane>
  </el-tabs>
</div>
</template>
<script lang="ts" setup>
import SearchWord from './SearchWord.vue';

</script>
<style scoped>

</style>