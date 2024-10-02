<template>
<div class="main">
  <el-divider />
    <el-tabs type="card" tab-position="bottom" class="tab">
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
<style scoped lang="scss">

.top {
  display: flex;
  border-bottom: 8px;
  justify-content: space-between;
  .single {
    align-items: center;
  }
}

.tab {
  height: 375px;
}
::v-deep .el-tabs__nav-scroll{
	width:50%;
	margin:0 auto
}


</style>