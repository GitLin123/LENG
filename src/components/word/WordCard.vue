<template>
    <div class="main">
        <el-card class="card" id="card" @click="nextWord">
            <div class="play"><el-icon size="24" @click.stop="playSound"><VideoPlay /></el-icon></div>
            <div class="word" v-if="words[currentIndex]?.word.length">
                <h2 v-if="!isFlipping">{{ words[currentIndex]?.word }}</h2>
                <p v-if="!isFlipping">{{ '/' + words[currentIndex]?.phonetic + '/' }}</p>
                <h5 v-if="!isFlipping" v-html="words[currentIndex]?.translation.replace(/\\n/g, '<br/>')"></h5>
            </div>
        </el-card>
        <div class="title" id="title">
            <p>每日单词{{ currentIndex + 1 }}/{{ nums }}</p><br />
            <p>Keep Fighting</p>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <div style="text-align: center;">
            <el-link type="success" :icon="RefreshRight" @click="loadWord">更新每日单词</el-link>&nbsp;
            <el-link type="success" :icon="Setting" @click="wordSetting">设置每日单词</el-link>
        </div>
        
        <el-dialog v-model="inSetting" draggable="true" title="每日单词设置" width="400">
            <el-span>单词个数</el-span>
            <el-select label="个数" v-model="nums" placeholder="Select" style="width: 240px">
                <el-option
                    v-for="(item, index) in [5, 10, 15, 20, 25]"
                    :key="index"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </el-dialog>
        <audio ref="audio" :src="audioSrc"></audio>
    </div>
</template>


<script setup>
import { RefreshRight, Setting, VideoPlay} from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted,watch,nextTick } from 'vue';
import { ElMessage } from 'element-plus'
import axios from 'axios'; // 确保引入axios
import { synthesizeTextToSpeech } from '/src/components/word/translation.ts';
const words = ref([]);
const nums = ref(10);
const colors = ['hotpink', 'lightblue', 'lightgreen', 'lightcoral', 'lightsalmon']; // 预定义的颜色数组
const colorIndex = ref(0); // 颜色索引
const currentIndex = ref(0);//当前卡片索引
const error = ref('');
const isFlipping = ref(false);
const loading = ref(false);
const inSetting = ref(false);
const audioSrc = ref('./11.wav');
const audio = ref(null)
const playSound = async () => {
    try {
        if (words.value[currentIndex.value]) {
            const word = words.value[currentIndex.value].word;
            const audioBuffer = await synthesizeTextToSpeech({
                text: word,
                appKey: '173b3bcd38d70be8',
                appSecret: 'ftewNKdaCGX7wl8xKiJXubvP6eDVcv05',
                voiceName: 'youmeimei',
                speed: 1.0,
                volume: 1.0
            });

            // 将 Buffer 转换为 Blob
            const blob = new Blob([audioBuffer], { type: 'audio/mp3' });

            // 创建一个 URL 对象
            const url = URL.createObjectURL(blob);

            // 设置音频元素的源
            audioSrc.value = url;

            // 确保音频元素已经更新了 src 属性，然后播放音频
            nextTick(() => {
                audio.value?.play();
            });
        }
    } catch (error) {
        console.error('Error synthesizing text to speech:', error);
        ElMessage.error('播放音频失败');
    }
};

watch(nums,()=> {
    loadWord();
})
const loadWord = async () => {
    error.value = '';
    words.value = []; // 清空当前单词
    loading.value = true;
    const promises = [];
    for (let i = 0; i < nums.value; i++) {
        promises.push(getValidWord());
    }
    try {
        const results = await Promise.all(promises);
        words.value = results.filter(word => word && word.word.length <= 16); // 过滤掉可能的空值和过长的单词
        currentIndex.value = 0; // 重置索引
        loading.value = true;
        ElMessage({
            type: 'success',
            message: '单词加载成功！',
            duration: 1000,
            plain: true
        })
    } catch (err) {
        error.value = '查找失败，请稍后再试。';
    }
};

const nextWord = () => {
    if (isFlipping.value) return; // 防止快速点击导致的问题
    isFlipping.value = true;

    const card = document.getElementById('card');
    const title = document.getElementById('title');
    title.style.opacity = '1'; // 显示标题

    card.style.transition = 'transform 0.3s, opacity 0.3s';
    card.style.transform = 'translateY(-200px)'; // 飞走的效果
    card.style.opacity = '0';

    setTimeout(() => {
        currentIndex.value = (currentIndex.value + 1) % nums.value;
        colorIndex.value = (colorIndex.value + 1) % colors.length; // 循环选择下一种颜色
        card.style.backgroundColor = colors[colorIndex.value]; // 更改卡片颜色
        card.style.transition = 'none'; // 移除过渡效果
        card.style.transform = 'translateY(-200px)' // 从另一侧进来
        card.style.opacity = '0';
    }, 600); // 动画完成后切换单词

    setTimeout(() => {
        card.style.transition = 'transform 0.3s, opacity 0.3s'; // 设置较短的过渡时间
        card.style.transform = 'translateY(0)';
        card.style.opacity = '1';
        title.style.opacity = '0'; // 隐藏标题
        isFlipping.value = false;
    }, 700); // 动画完成后恢复状态
};
const find = async (id) => {
    try {
        const result = await axios.get(`http://localhost:3000/get_word2?id=${id}`);
        return result.data[0];
    } catch (err) {
        console.error(err); // 输出错误到控制台
        return null; // 返回 null 以便在 Promise.all 处理时忽略
    }
};

const getValidWord = async () => {
    let word = null;
    while (!word || !word.phonetic) {
        const randomId = Math.seededRandom(762411, 608);
        word = await find(randomId);
    }
    return word;
};

// 根据当前日期生成种子
const generateSeed = () => {
    const now = new Date();
    return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
};

Math.seed = generateSeed();

Math.seededRandom = function (max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    const rnd = Math.seed / 233280.0;
    return Math.ceil(min + rnd * (max - min)); // 返回生成的随机数
};
//------------------------------------------

onMounted(() => {
    loadWord();
});

//修改每日单词的配置
const wordSetting = () => {
    inSetting.value = true
}
</script>

<style scoped lang="scss">
.main {
    position: relative;
    cursor: pointer;
    .play {
        text-align: right;
        height: 20;
    }
    .card {
        background-color: hotpink;
        width: 400px;
        height: 250px;
        padding: 0px;
        text-align: center;
        margin-bottom: 20px;
        transform-style: preserve-3d;
        transition: transform 0.1s;
        /* 添加过渡效果 */
        border-radius: 10px;

        .word {
            font-size: x-large;

            h2 {
                margin-top: 20px;
                margin-bottom: 0;
            }

            p {
                margin-top: 30px;
                font-size: medium;
            }

            h5 {
                margin: 10px 0;
                font-size: 14px;
            }
        }
    }

    .title {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        /* 初始状态隐藏 */
        top: 100px;
        transition: opacity 0.6s;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        /* 添加过渡效果 */
        p {
            font-size: larger;
            margin: 0px 0;
        }

        user-select: none;
        /* 禁用用户选择文本 */
        -webkit-user-select: none;
        /* 适用于Safari */
        -moz-user-select: none;
        /* 适用于Firefox */
        -ms-user-select: none;
        /* 适用于Internet Explorer/Edge */
        pointer-events:none;
    }

    .error {
        color: red;
    }

    .word {
        user-select: none;
        /* 禁用用户选择文本 */
        -webkit-user-select: none;
        /* 适用于Safari */
        -moz-user-select: none;
        /* 适用于Firefox */
        -ms-user-select: none;
        /* 适用于Internet Explorer/Edge */
    }
}</style>