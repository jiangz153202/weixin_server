var express = require('express');
var router = express.Router();

var wechat = require('wechat');
var config = require('../config.js');

var wechatAPI = require('wechat-api'); 


//创建wechat-api
var api = new wechatAPI(config.appid, config.appSecret);

var menu = {
  "button": [
    {
      "type": "click",
      "name": "WeChat Bot",
      "key": "V1001_TODAY_MUSIC"
    },
    {
      "name": "BotFramework",
      "sub_button": [
        {
          "type": "view",
          "name": "botframework",
          "url": "https://dev.botframework.com/"
        },
        {
          "type": "click",
          "name": "赞一下我们",
          "key": "V1001_GOOD"
        }, {
          "name": "发送位置",
          "type": "location_select",
          "key": "rselfmenu_2_0"
        },]
    }]
};
//删除菜单
api.removeMenu(function (err, result) {
  if (err) {
    console.log('error', err);
  }
  console.log('info', 'remove menu success');
});

//创建菜单
api.createMenu(menu, function (err, result) {
  if (err) {
    console.log('error', err);
  }
  console.log('info', 'create menu success');
});

router.use(express.query());  
router.use('/wechat', wechat(config, wechat.text(function (message, req, res, next) {
    //------------------------------------------------------------------------
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('Message Send To Bot Completed , Wait Response.');
    
    api.sendText(message.FromUserName, 'this message from wechat-api', function (err, result) {
        if (err) {
          console.log('error', err);
        }
        console.log('info', 'reply message success');
      });
    
  }).image(function (message, req, res, next) {
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('功能开发中');
  }).voice(function (message, req, res, next) {
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('功能开发中');
  }).video(function (message, req, res, next) {
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('功能开发中');
  }).location(function (message, req, res, next) {
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('功能开发中');
  }).link(function (message, req, res, next) {
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('功能开发中');
  }).event(function (message, req, res, next) {
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('感谢你的关注，你也可以在nodejs npm中查看wechat和wechat-api');
  
  }).device_text(function (message, req, res, next) {
    var message = req.weixin;
    console.log("info", message);
  
    res.reply('功能开发中');
  }).device_event(function (message, req, res, next) {
    if (message.Event === 'subscribe' || message.Event === 'unsubscribe') {
      var message = req.weixin;
      console.log("info", message);
  
      res.reply("功能开发中");
    } else {
      var message = req.weixin;
      console.log("info", message);
  
      res.reply('功能开发中');
    }
  })));

module.exports = router;

