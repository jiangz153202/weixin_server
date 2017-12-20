var logger = require('morgan');
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
router.use('/wechat', wechat(config,function(req, res, next) {
	
    var message=req.weixin;
    if (message && message.MsgType == 'text') {
        var text = '';
        var description = '';
        switch (message.Content) {
            case '阿龟':
                res.reply({
                    content: 'hello world!',
                    type: 'text'
                });
                break;
            case 'img':
                text = '关键词2';
                description = message.ToUserName + '----' + message.FromUserName;
                res.reply([
                    {
                        title: text,
                        description: description,
                        picurl: '图片绝对地址',
                        url: '' }
                ]);
                break;
            default:    //默认回复文本消息
                res.reply({
                    content: '消息已收到',
                    type: 'text'
                });
                break;
        }
    } else if (message && message.Event) {
        switch (message.Event) {
            case 'subscribe':
                res.reply({
                    content: '关注事件',
                    type: 'text'
                });
                break;
            case 'unsubscribe':    //取消关注
                break;
            default:
                res.reply({
                    content: 'O(∩_∩)O~',
                    type: 'text'
                });
                break;
        }
    }

}));  

module.exports = router;

