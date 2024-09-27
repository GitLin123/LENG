<template>
    <div style="position: fixed">
      <el-tabs type="card">
        <el-tab-pane label="和AI聊天"><AiTalk></AiTalk></el-tab-pane>
        <el-tab-pane label="和盆友聊天">Talk with friends</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import AiTalk from './AiTalk.vue'

</script>