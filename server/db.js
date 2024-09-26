// 数据库连接配置
//db.js——用来添加 mysql 配置
//根据mysql的IP，端口，用户名，密码，数据库名称自行修改
// db.js
import mysql from 'mysql';

// 创建连接
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'leng'
});

// 测试连接
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
    } else {
        console.log('Connected to MySQL as id ' + connection.threadId);
        connection.release(); // 连接不再需要时释放它
    }
});

// 导出连接池
export default pool;
