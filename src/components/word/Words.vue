<template>
<div class="main">
  <div class="top">
    <el-carousel height="300px" style="width: 500px;border-radius: 10px;" motion-blur>
      <el-carousel-item v-for="item in imgs" :key="item">
        <img :src="item.url" alt="loading fail" style="height: 300px;width: 500px;">
      </el-carousel-item>
    </el-carousel>
    <div class="single"><WordCard></WordCard></div>
  </div>
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
import WordCard from './WordCard.vue';
const imgs = [
  {
    url:'/imgs/1.jpg',
    target:'https://www.chinadaily.com.cn/a/202409/27/WS66f60e95a310f1265a1c527d.html'
  },
  {
    url:'/imgs/2.jpg',
    target:'https://www.chinadaily.com.cn/a/202409/27/WS66f612f7a310f1265a1c52cb.html'
  },
  {
    url:'/imgs/3.jpg',
    target:'https://www.chinadaily.com.cn/a/202409/27/WS66f5f13ea310f1265a1c51bd.html'
  },
  {
    url:'/imgs/4.jpg',
    target:'https://www.chinadaily.com.cn/a/202409/27/WS66f60eb3a310f1265a1c5282.html'
  },
]
</script>
<style scoped lang="scss">
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