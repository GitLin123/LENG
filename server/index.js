// node 后端服务器
//index.js——Express 服务器入口文件
import { createRequire } from 'module';
import pool from './db.js'
const require = createRequire(import.meta.url);

const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

//采用设置所有均可访问的方法解决跨域问题
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 使用连接池执行查询
app.get('/get_word', (req, res) => {
    // 这里我们假设你希望根据查询参数中的 'word' 获取数据
    const word = req.query.word; // 从查询参数中获取单词

    if (!word) {
        return res.status(400).send('Word parameter is required');
    }

    // 使用参数化查询来避免 SQL 注入
    const sql = 'SELECT * FROM ecdict WHERE word = ?';
    pool.query(sql, [word], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// 使用连接池执行查询
app.get('/get_word2', (req, res) => {
    // 这里我们假设你希望根据查询参数中的 'id' 获取数据
    const id = req.query.id; // 从查询参数中获取单词
    if (!id) {
        return res.status(400).send('id parameter is required');
    }

    // 使用参数化查询来避免 SQL 注入
    const sql = 'SELECT * FROM ecdict WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/welcome', (req, res) => {
  res.send('hello world')
})

// 监听端口
app.listen(3000,()=>{
    console.log("Hello World!")
})

