import axios from 'axios';
import * as CryptoJS from 'crypto-js';

interface SynthesizeTextToSpeechParams {
    text: string;
    appKey: string;
    appSecret: string;
    voiceName: string;
    speed?: number;
    volume?: number;
}

/**
 * 调用有道智云TTS API，将文本合成音频文件
 * @param {SynthesizeTextToSpeechParams} params - 参数对象
 * @returns {Promise<Buffer>} - 返回Promise对象，解析为音频文件的Buffer
 */
export async function synthesizeTextToSpeech({
    text,
    appKey,
    appSecret,
    voiceName,
    speed = 1.0,
    volume = 1.0
}: SynthesizeTextToSpeechParams): Promise<Buffer> {
    const salt = generateUUID();
    const curtime = Math.floor(Date.now() / 1000);
    const input = text.length > 20 ? `${text.substring(0, 10)}${text.length}${text.substring(text.length - 10)}` : text;
    const sign = CryptoJS.SHA256(appKey + input + salt + curtime + appSecret).toString(CryptoJS.enc.Hex);

    const params = new URLSearchParams();
    params.append('q', encodeURIComponent(text));
    params.append('appKey', appKey);
    params.append('salt', salt);
    params.append('sign', sign);
    params.append('signType', 'v3');
    params.append('curtime', curtime.toString());
    params.append('format', 'mp3');
    params.append('voiceName', voiceName);
    params.append('speed', speed.toString());
    params.append('volume', volume.toString());

    try {
        const response = await axios.post('https://openapi.youdao.com/ttsapi', params, { responseType: 'arraybuffer' });
        if (response.headers['content-type'] === 'audio/mp3') {
            // 返回音频文件的Buffer
            return response.data;
        } else {
            // 处理错误响应
            throw new Error(`Error: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        throw new Error(`Request failed: ${error.message}`);
    }
}

/**
 * 生成UUID
 * @returns {string} - 返回生成的UUID
 */
function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
