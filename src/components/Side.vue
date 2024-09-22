<template>
<el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        style="height:719px"
        router="true"
      >
        <el-menu-item index="/">
          <el-icon><icon-menu /></el-icon>
          <span>学单词</span>
        </el-menu-item>

        <el-menu-item index="/gram">
          <el-icon><icon-menu /></el-icon>
          <span>学语法</span>
        </el-menu-item>

        <el-menu-item index="/talk">
          <el-icon><document /></el-icon>
          <span>聊聊天</span>
        </el-menu-item>

        <el-menu-item index="/home">
          <el-icon><setting /></el-icon>
          <span>我的家</span>
        </el-menu-item>
      </el-menu>
</template>

<script  lang="ts" setup>
const change = () => {

}
</script>

<style scoped>

</style>