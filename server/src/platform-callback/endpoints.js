import wechatCsc from 'wechat-corp-service-callback';
import WXBizMsgCrypt from 'wechat-crypto';
import APICorp from 'wechat-corp-service';
import config from '../config';

let gSequelize = null;
let gCryptor = null;
let gsuiteTicket = null;

const save_ticket = (sequelize, data, callback) => {
  sequelize.query('INSERT INTO wx_qy_suites (suite_id, aes_key, token, ticket, expiredAt) ' +
    'VALUES($suiteId, $aesKey, $token, $ticket, DATE_ADD(now(), interval $expired MINUTE)) ' +
    'ON DUPLICATE KEY UPDATE ticket=$ticket, expiredAt=DATE_ADD(now(), interval $expired MINUTE)',
    { bind: { suiteId: data.suiteId, aesKey: data.aesKey, token: data.token, ticket: data.ticket, expired: data.expired },
      type: sequelize.QueryTypes.INSERT }).spread((results, metadata) => {
    // Results will be an empty array and metadata will contain the number of affected rows.
    callback(null, 0);
  });
};

const save_corp = (sequelize, data, callback) => {
  sequelize.query('INSERT INTO wx_qy_corps (suite_id, corpid, corp_name, corp_type, corp_square_logo_url, \n' +
    'corp_user_max, corp_agent_max, corp_full_name, corp_industry, \n' +
    'corp_sub_industry, admin_userid, admin_name, admin_avatar, permanent_code, \n' +
    'createdAt, updatedAt) \n' +
    'VALUES($suiteId, $corpId, $corpName, $corpType, $logoUrl, $userMax, $agentMax, $fullName, $industry, \n' +
    '$subIndustry, $userId, $userName, $userAvatar, $permanentCode, now(), now()) \n' +
    'ON DUPLICATE KEY UPDATE admin_userid=$userId, admin_name=$userName, admin_avatar=$userAvatar, \n' +
    'permanent_code=$permanentCode, updatedAt=now()',
    { bind: {
      suiteId: data.suiteId, corpId: data.corpid, corpName: data.corp_name, corpType: data.corp_type,
      logoUrl: data.corp_square_logo_url, userMax: data.corp_user_max, agentMax: data.corp_agent_max,
      fullName: data.corp_full_name, industry: data.corp_industry, subIndustry: data.corp_sub_industry,
      userId: data.userid, userName: data.username, userAvatar: data.avatar, permanentCode: data.permanentCode },
      type: sequelize.QueryTypes.INSERT }).spread((results, metadata) => {
    // Results will be an empty array and metadata will contain the number of affected rows.
    callback(null, 0);
  });
};

const get_token = (cb) => {

};

const save_token = (token, cb) => {

};

const app_suite = (req, res, next) => {
  const that = this;
  const sc = config.authMethods['wechat-work'];
  const _config = {
    token: sc.token,
    encodingAESKey: sc.aesKey,
    suiteid: sc.suiteId,
  };
  gCryptor = new WXBizMsgCrypt(sc.token, sc.aesKey, sc.suiteId);

  var _route = function(message, req, res, next) {

    if (message.InfoType === 'suite_ticket') { // 微信服务器发过来的票，每10分钟发一次
      // 更新到数据库
      const suite_ticket = message.SuiteTicket;
      gsuiteTicket = suite_ticket;
      // const suite_ticket_tm = new Date(parseInt(message.TimeStamp) * 1000);
      // 将最新的ticket放到数据库中, 调用用户自己定义的 save_ticket(callback) 方法。
      save_ticket(gSequelize, {suiteId: sc.suiteId, token: sc.token, aesKey: sc.aesKey, ticket: suite_ticket, expired: 10}, (err, ret) => {
        res.reply('success');
      });
    } else if (message.InfoType === 'create_auth') {
      const apicorp = new APICorp(sc.suiteId, sc.suiteSecert, gsuiteTicket, get_token, save_token);

      // $work->setSuiteTempAuthCode(message.SuiteId, message.AuthCode);
      apicorp.getPermanentCode(message.AuthCode, ( data ) => {
        const permanentCode = data.auth_code;
        save_corp(gSequelize, {suiteId: sc.suiteId, permanentCode: permanentCode}, (err, ret) => {
          res.reply('success');
        });
      });

    } else if (message.InfoType === 'change_auth') { // 变更授权的通知
      // 更新到数据库
      res.reply('success');

    } else if (message.InfoType === 'cancel_auth') { // 取消授权的通知
      // 更新到数据库
      res.reply('success');
    } else {
      res.reply('success');
    };
  }
  if (req.method === 'POST') {
    wechatCsc(_config, _route)(req, res, next);
  } else if (req.method === 'GET') {
    const signature = req.query.msg_signature;
    const timestamp = req.query.timestamp;
    const nonce = req.query.nonce;
    const cryptor = req.cryptor || gCryptor;

    if (req.query.echostr) {
      const echostr = req.query.echostr;
      if (signature !== cryptor.getSignature(timestamp, nonce, echostr)) {
        res.writeHead(401);
        res.end('Invalid signature');
        return;
      }
      var result = cryptor.decrypt(echostr);
      // TODO 检查corpId的正确性
      res.writeHead(200);
      res.end(result.message);
      return;
    }
    res.send('这个接口不适合GET');
  };
};

export default {

  setup(app: {}, sequelize: {}) {
    gSequelize = sequelize;
    app.get('/qywx_suite', app_suite);
    app.post('/qywx_suite', app_suite);
  },

};
