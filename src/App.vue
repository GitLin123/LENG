<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px"><Side></Side></el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </div>
<div></div>
</template>

<script setup lang="ts">
import Side from './components/Side.vue'
</script>


<style scoped>
</style>
