<template>
<el-menu
        default-active="/"
        class="el-menu-vertical-demo"
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
  .el-menu-item.is-active {
    color:#55d5b9
  }
  .el-menu-vertical-demo {
    position:fixed;
    overflow-y: auto;
    width: 200px;
    height: 719px
  }
  .el-aside {
    width: 200px
  }
</style>