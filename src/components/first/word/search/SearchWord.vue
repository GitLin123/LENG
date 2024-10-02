<template>
    <div class="main">
      <el-input
        v-model="words"
        style="width: 300px; margin-right: 8px"
        placeholder="请输入单词"
        @keyup.enter="find"
      ></el-input>
      <el-button type="primary" size="default" @click="find" :disabled="loading">查找</el-button>
    </div>
    <div class="result" v-if="res && res.length > 0">
      <h2>{{ words }}</h2>
      <p>{{ '英 /' + res[0]?.phonetic + '/' }}</p>
      <h5 v-html="formattedTranslation"></h5>
      <h5 v-html="formattedDefinition"></h5>
    </div>
    <div v-else-if="error.length > 0" class="error">{{ error }}</div>
    <div v-else class="loading" v-if="loading">加载中...</div>
  </template>
  
  <script setup lang='ts'>
  import { ref, computed, watch } from 'vue';
  import axios from 'axios';
  
  const words = ref<any>('');
  const res = ref<WordData[]>([]);
  const loading = ref<any>(false);
  const error = ref<any>('');
  interface WordData {
  word: string;
  phonetic: string;
  definition: string;
  translation: string;
  pos: string | null;
  collins: string;
  oxford: string;
  tag: string;
  bnc: string;
  frq: string;
  exchange: string;
  detail: string | null;
  audio: string | null;
}
  const formattedTranslation = computed(() => {
    return res.value[0]?.translation?.replace(/\\n/g, '<br/>') || '';
  });
  
  const formattedDefinition = computed(() => {
    return res.value[0]?.definition?.replace(/\\n/g, '<br/>') || '';
  });
  
  watch(words, () => {
    // 清空之前的结果和错误信息
    res.value = [];
    error.value = '';
  });
  
  const find = async () => {
    if (!words.value.trim()) {
      error.value = '请输入单词';
      return;
    }
    
    loading.value = true;
    error.value = '';
    
    try {
      const result = await axios.get(`http://localhost:3000/get_word?word=${encodeURIComponent(words.value)}`);
      res.value = result.data;
      console.log(res.value)
      if(res.value.length==0){error.value=`未找到单词${words.value}`}
    } catch (err) {
      error.value = '查找失败，请稍后再试。';
    } finally {
      loading.value = false;
    }
  }


  </script>
  
  <style scoped>
  .main {
    margin-bottom: 16px;
    text-align: center;
  }
  .error {
    color: red;
  }
  .loading {
    color: grey;
  }
  .result {
    overflow-y: scroll;
    height: 500px;
    
  }
  </style>