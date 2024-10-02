<template>
  <div class="top" v-if="!isSearch">
    <el-carousel height="300px" style="width: 500px;border-radius: 10px;" motion-blur>
      <el-carousel-item v-for="item in imgs" :key="item">
        <img :src="item.url" alt="loading fail" style="height: 300px;width: 500px;">
      </el-carousel-item>
    </el-carousel>
    <div class="single"><WordCard></WordCard></div>
  </div>
  <el-divider style="margin-bottom:10px"></el-divider>
  <div class="bottom">
    <div class="recommon">
        今日推荐
    </div>
    <div class="learn">
        <div class="search"><el-input placeholder="输入要查的单词"  style="width:70%;"></el-input> <el-button type="primary" size="default" @click="">查单词</el-button></div>
        <div class="card">
            <el-card shadow="always" style="height:100px;margin-bottom:10px;border-radius:10px" v-for="(item,index) in list" :body-style="{ padding: '20px'}">
            <div slot="header">
                <span>{{ item.name }}</span>
            </div>
            <!-- card body -->
        </el-card>
        </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import WordCard from './word/WordCard.vue';
import {ref} from 'vue'
const isSearch = ref(false)
const list = [
    {
        name: "学单词",
        url: "/word"
    },
    {
        name: "学语法",
        url: "/gram"
    },
    {
        name: "听播客",
        url: "/word"
    },
]
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

.bottom {
    display:flex;
    .recommon {
        border-radius: 10px;
        margin-right:10px;
        padding:8px;
        width:66vw;
        border-right:4px;
        background-color:#f3f3f3;
        height:50vh;
    }
    .learn {
        border-radius: 10px;
        padding:8px;
        background-color:#f4f4f4;
        width:30vw;
        heigth:50vh;
        .search {
            margin-bottom:10px;
            .card {
                
            }
        }

    }
}


</style>