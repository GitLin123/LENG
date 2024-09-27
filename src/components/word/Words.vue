<template>
<div class="main">
  <div class="top">
    <el-carousel height="250px" style="width: 450px;" motion-blur>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <div class="weather"></div>
  </div>
  <div style="height: 10px;"></div>
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
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.top {
  display: flex;
  border-bottom: 8px;
}
</style>