<template>
    <div>
        <el-input 
            v-model="tag"
            placeholder="请输入聊天的内容"
            size="normal"
            clearable
            style="width:400px;"
            @keyup.enter="commit"
        />
        <el-button type="primary" @click="commit">发送</el-button>
        
        <div class="chat-container" ref="chatContainer">
            <div class="message-list">
                <div v-for="(item, index) in message" :key="index" v-html="renderMessage(item)"></div>
                <p v-if="typing">{{ "AI_Speaker: "+currentAIMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import axios from 'axios';
import { marked } from 'marked'; // 引入 marked
import hljs from 'highlight.js'; // 引入 highlight.js
import 'highlight.js/styles/github.css'; // 引入样式（可以选择其他样式）

let tag = ref('');
let message = ref([
    {
        role: 'system',
        content: 'Please start chat when you read this message.'
    }
]);
let typing = ref(false);
let currentAIMessage = ref('');
const url = 'https://api.openai-hk.com/v1/chat/completions';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer hk-tzdchl1000043647baa748ccceb143e66939d3d7a8328700'
};

const chatContainer = ref(null);

const commit = async () => {
    if (tag.value.trim() === '') return;
    if (typing.value) return;

    message.value.push({ role: 'user', content: tag.value });

    const data = {
        max_tokens: 1200,
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        top_p: 1,
        presence_penalty: 1,
        messages: message.value
    };

    try {
        const response = await axios.post(url, data, { headers });
        const result = response.data;
        const aiMessage = result?.choices[0]?.message?.content || '没有返回内容';
        
        await typeWriter(aiMessage);
        message.value.push({ role: 'assistant', content: aiMessage });

        tag.value = '';
    } catch (error) {
        console.error(error);
        currentAIMessage.value = '出错了，请重试';
    }
};

const typeWriter = (text) => {
    return new Promise((resolve) => {
        typing.value = true;
        currentAIMessage.value = '';
        let index = 0;

        const typingEffect = () => {
            if (index < text.length) {
                currentAIMessage.value += text.charAt(index);
                index++;
                nextTick(() => {
                    scrollToBottom();
                });
                setTimeout(typingEffect, 200);
            } else {
                typing.value = false;
                resolve();
            }
        };

        typingEffect();
    });
};

const scrollToBottom = () => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};

// 渲染消息内容为 Markdown，并应用高亮
const renderMessage = (item) => {
    const content = item.role === "assistant" ? "AI_Speaker: " : "You: ";
    const markdownContent = marked(content + item.content);
    
    // 将返回的 HTML 内容包含代码高亮处理
    const highlightedContent = highlightCode(markdownContent);

    return highlightedContent;
};

// 高亮代码块
const highlightCode = (html) => {
    // 在解析 HTML 时，查找代码块并应用高亮
    const container = document.createElement('div');
    container.innerHTML = html;

    // 获取所有的代码块
    const codes = container.querySelectorAll('pre code');
    codes.forEach((block) => {
        hljs.highlightBlock(block); // 应用高亮
    });

    return container.innerHTML;
};

watch(message, () => {
    nextTick(() => {
        scrollToBottom();
    });
}, { deep: true });

onMounted(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        message.value = JSON.parse(savedMessages);
    }
});

onBeforeUnmount(() => {
    localStorage.setItem('chatMessages', JSON.stringify(message.value));
});
</script>


<style scoped>
.chat-container {
    max-height: 500px; /* 根据需要设置容器高度 */
    width: 900px;
    overflow-y: auto; /* 超出时显示垂直滚动条 */
    border: 1px solid #ccc; /* 可以添加边框样式 */
    padding: 10px; /* 添加一些内边距 */
    margin-top: 10px; /* 与输入框有间距 */
    scrollbar-color: rgb(119, 119, 119) white;
    background: hsla(0, 0%, 95%, 0.827);
    border-radius: 8px;
}


.message-list {
    display: flex;
    flex-direction: column; /* 垂直排列消息 */
    gap: 3px; /* 消息之间的间距 */
}

pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
}

code {
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 14px;
    color: #333;
}
</style>