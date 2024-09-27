<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px"><Side></Side></el-aside>
            <el-main>
                <router-view v-slot="{ Component }">
                    <transition name="fade">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </div>
<div></div>
</template>

<script setup lang="ts">
import Side from './components/side/Side.vue'
</script>
<style scoped>
/* 定义过渡效果 */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s;
}
 
/* 可能为enter失效，拆分为 enter-from和enter-to */
.fade-enter-from {  
  opacity: 0;
  transform: translateX(-30px);
}
.fade-enter-to { 
  opacity: 1;
  transform: translateX(0px);
}
 
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>