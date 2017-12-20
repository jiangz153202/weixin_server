var express = require('express');
var router = express.Router();

var wechat = require('wechat');
var config = require('../config.js');
var weichatApi = require('../lib/wechatAPI.js');

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
            case '创建菜单':
                weichatApi._createMenu();
                res.reply('创建菜单中,请退出公众号重新进入');
                break;
            case '删除菜单':
                weichatApi._removeMenu();
                res.reply('删除菜单中,请退出公众号重新进入');
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

