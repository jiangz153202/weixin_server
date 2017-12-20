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
module.exports = {
    _createMenu : function(){
        //创建菜单
        api.createMenu(menu, function (err, result) {
          if (err) {
            console.log('error', err);
          }
          console.log('info', 'create menu success');
        });
    },
    _removeMenu : function(){
        //删除菜单
        api.removeMenu(function (err, result) {
          if (err) {
            console.log('error', err);
          }
          console.log('info', 'remove menu success');
        });
    }
};