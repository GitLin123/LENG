<template>
    <div>
        <el-input v-model="words" style="width:300px;margin-right:8px"></el-input>
        <el-button type="primary" size="default" @click="find" >查找</el-button>
        <h3>单词名:{{ meaning[0]?.word }}</h3>
        <h3>翻译:{{ meaning[0]?.translation }}</h3>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import axios from 'axios';
let words:any = ref('')
let meaning:any = ref([])
const find=async ()=>{
    let result = await axios({
        method:'get',
        url:`http://localhost:3000/get_word?word=${words.value}`,
    })
    meaning.value = result.data
}
</script>

<style scoped>

</style>