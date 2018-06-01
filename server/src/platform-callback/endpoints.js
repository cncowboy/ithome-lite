import wechat_cs from 'wechat-corp-service-callback';
import config from '../config';

const app_suite = function(req, res, next) {
    const sc = config['authMethods']['wechat-work'];
    var _config = {
        token: sc.token,
        encodingAESKey: sc.aes_key,
        suiteid: sc.suite_id,
    };
    var _route = function(message, req, res, next) {
        
        if (message.InfoType == 'suite_ticket') { //微信服务器发过来的票，每10分钟发一次
            //更新到数据库
            var suite_ticket = message.SuiteTicket;
            var suite_ticket_tm = new Date(parseInt(message.TimeStamp) * 1000);
            //将最新的ticket放到数据库中, 调用用户自己定义的 save_ticket(callback) 方法。
             save_ticket(function(err, ret) {
                res.reply('success');
            });
        } else if (message.InfoType == 'change_auth') { //变更授权的通知
            //更新到数据库
            res.reply('success');

        } else if (message.InfoType == 'cancel_auth') { //取消授权的通知
            //更新到数据库
            res.reply('success');
        } else {
            res.reply('success');
        };
    }
    if (req.method == 'POST') {
        wechat_cs(_config, _route)(req, res, next);
    } else if (req.method == 'GET') {
        res.send('这个接口不适合GET');
    };
}

export default {

  setup(app: {}) {
    app.get( '/qywx_suite', app_suite);
    app.post( '/qywx_suite', app_suite);
  },

};
