<template>
<el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        router="true"
      >
        <el-menu-item index="/">
          <el-icon><icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>

        <el-menu-item index="/gram">
          <el-icon><icon-menu /></el-icon>
          <span>播客</span>
        </el-menu-item>

        <el-menu-item index="/gram">
          <el-icon><icon-menu /></el-icon>
          <span>阅读</span>
        </el-menu-item>

        <el-menu-item index="/talk">
          <el-icon><document /></el-icon>
          <span>聊天</span>
        </el-menu-item>

        <el-menu-item index="/home">
          <el-icon><setting /></el-icon>
          <span>我的</span>
        </el-menu-item>
      </el-menu>
</template>

<script  lang="ts" setup>
</script>

<style scoped>
.el-menu {
  text-align: left;
  user-select: none;
        /* 禁用用户选择文本 */
        -webkit-user-select: none;
        /* 适用于Safari */
        -moz-user-select: none;
        /* 适用于Firefox */
        -ms-user-select: none;

}
.el-menu-item {
  margin-bottom: 10px; /* 添加间距 */
  border-radius: 10px; /* 确保每个菜单项有圆角 */
  margin: 10px;
  height: 45px;
  padding-right: 0px;

}
  .el-menu-item.is-active {
    color:#337337;
    background: #55d5b9;
    border-radius: 10px;
    margin: 10px;
}

.el-menu-item:hover{   
  background: #dbdbdb;
    border-radius: 10px;
    margin: 10px;
}  
.el-menu-item.is-active:hover {
  background: #55d5b9; /* 保持已选中项的背景颜色不变 */
}
  .el-menu-vertical-demo {
    position:fixed;
    overflow-y: auto;
    width: 200px;
    height: 100vh;
  }
  .el-aside {
    width: 200px
  }
</style>