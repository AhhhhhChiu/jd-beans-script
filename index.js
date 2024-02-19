const http = require('http');

// 填入鉴权信息，可在 m.jd.com 的 Cookie 中拿到
const pt_key = "AAJl005PADDth_O2RofgywD8RfOE7SKQVKEfl0zAf4e-TFJysDvhHrwD_YePFj6wlpBF8rO1kK8"
const pt_pin = "jd_545cc7ee46035"

// 定义接口信息
const options = {
  hostname: 'api.m.jd.com',
  // port: 80,
  path: '/client.action?functionId=signBeanAct&body=%7B%22fp%22%3A%22-1%22%2C%22shshshfp%22%3A%22-1%22%2C%22shshshfpa%22%3A%22-1%22%2C%22referUrl%22%3A%22-1%22%2C%22userAgent%22%3A%22-1%22%2C%22jda%22%3A%22-1%22%2C%22rnVersion%22%3A%223.9%22%7D&appid=ld',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `pt_key=${pt_key};pt_pin=${pt_pin};`
  }
};

// 发送POST请求
function sendPostRequest() {
  const req = http.request(options, (res) => {
    console.log(`请求状态码: ${res.statusCode}`);
    // 这里可以处理响应数据
    res.on('data', (data) => {
      console.log(`响应数据: ${data}`);
    });
  });

  req.on('error', (error) => {
    console.error('请求出错:', error);
  });

  // req.write(JSON.stringify({ viewChannel:"wojing3", beanVersion:1 }));

  req.end();
}

// 每天执行一次请求
function executeDailyRequest() {
  sendPostRequest();
  setTimeout(executeDailyRequest, 60 * 60 * 1000); // 每小时执行
}

// 启动
executeDailyRequest();
