<template>
    <div>
        <el-input v-model="tag"
        placeholder="请输入聊天的内容" 
        size="normal"
        clearable
        type="textarea" 
        style="width:400px;"></el-input>
        <el-button type="primary" @click="commit">发送</el-button>
        <div>
            <p v-for="(item,index) in message":key=index>{{ item.role + ": " + item.content}}</p><br/>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import axios from 'axios';
import { onMounted } from 'vue';
import { onBeforeUnmount } from 'vue';
let tag = ref('')
let message = ref([
  {
    role: 'system',
    content: 'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.'
  }
]);
let answer = ref('')
const url = 'https://api.openai-hk.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer hk-tzdchl1000043647baa748ccceb143e66939d3d7a8328700'
};

const data = {
  max_tokens: 1200,
  model: 'gpt-3.5-turbo',
  temperature: 0.8,
  top_p: 1,
  presence_penalty: 1,
  messages: [
    {
      role: 'system',
      content: 'You are ChatGPT, a large language model trained by OpenAI.'
    },
    {
      role: 'user',
      content: 'hello'
    }
  ]
};

const commit = async () => {
  // 添加当前用户的消息
  message.value.push({ role: 'user', content: tag.value });

  const data = {
    max_tokens: 1200,
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    top_p: 1,
    presence_penalty: 1,
    messages: message.value // 使用完整的消息历史
  };

  try {
    const response = await axios.post(url, data, { headers });
    const result = response.data;
    const aiMessage = result?.choices[0]?.message?.content || '没有返回内容';

    // 添加 AI 的回复到消息列表
    message.value.push({ role: 'assistant', content: aiMessage });
    answer.value = aiMessage; // 将回复显示在页面
    tag.value = ''
  } catch (error) {
    console.error(error);
    answer.value = '出错了，请重试';
  }
}

// 组件创建的时候本地加载聊天记录
onMounted(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        message.value = JSON.parse(savedMessages);
    }
});

// 组件销毁的时候本地保存聊天记录
onBeforeUnmount(() => {
    localStorage.setItem('chatMessages', JSON.stringify(message.value));
});
</script>

<style scoped>

</style>