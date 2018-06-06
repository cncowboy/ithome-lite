import wechatCsc from 'wechat-corp-service-callback';
import WXBizMsgCrypt from 'wechat-crypto';
import config from '../config';
import { mergeObjects } from "../utils/utils";

let gSequelize = null;
let gCryptor = null;
let gApiWxqy = null;
let gResources = null;

const save_ticketQ = async (sequelize, resourcesFromSetup, data) => {
  /*
  const awaitedResourcesFromSetup = await resourcesFromSetup;
  const resourceWxQySuite = awaitedResourcesFromSetup.get('WxQySuite');
  const modelSuite = resourceWxQySuite[2];
  */
  const results = await sequelize.query('INSERT INTO wx_qy_suite (suite_id, aes_key, token, ticket, expiredAt) ' +
    'VALUES($suiteId, $aesKey, $token, $ticket, DATE_ADD(now(), interval $expired MINUTE)) ' +
    'ON DUPLICATE KEY UPDATE ticket=$ticket, expiredAt=DATE_ADD(now(), interval $expired MINUTE)',
    {
      bind: { suiteId: data.suiteId, aesKey: data.aesKey, token: data.token, ticket: data.ticket, expired: data.expired },
      type: sequelize.QueryTypes.INSERT, raw: false
    }
  );
  console.log(results);
  return results;
};

const import_corpQ = async (sequelize, resourcesFromSetup, data) => {
  const wxQyCorpsInsertResult = await sequelize.query(
    'INSERT INTO wx_qy_corp (suite_id, corpid, corp_name, corp_type, corp_square_logo_url, \n' +
    'corp_user_max, corp_agent_max, corp_full_name, corp_scale, corp_industry, \n' +
    'corp_sub_industry, admin_userid, admin_name, admin_avatar, permanent_code, \n' +
    'createdAt, updatedAt) \n' +
    'VALUES($suiteId, $corpId, $corpName, $corpType, $logoUrl, $userMax, $agentMax, $fullName, $corpScale, $industry, \n' +
    '$subIndustry, $userId, $userName, $userAvatar, $permanentCode, now(), now()) \n' +
    'ON DUPLICATE KEY UPDATE admin_userid=$userId, admin_name=$userName, admin_avatar=$userAvatar, \n' +
    'permanent_code=$permanentCode, updatedAt=now()',
    {
      bind: {
        suiteId: data.suiteId, corpId: data.corpid, corpName: data.corp_name, corpType: data.corp_type,
        logoUrl: data.corp_square_logo_url, userMax: data.corp_user_max, agentMax: data.corp_agent_max,
        fullName: data.corp_full_name, corpScale: data.corp_scale, industry: data.corp_industry, subIndustry: data.corp_sub_industry,
        userId: data.userid, userName: data.user_name, userAvatar: data.user_avatar, permanentCode: data.permanent_code
      },
      type: sequelize.QueryTypes.INSERT, raw: true
    }
  );
  const wxQyCorps = await sequelize.query('SELECT * FROM wx_qy_corp WHERE corpid=$corpid', { bind: {corpid: data.corpid}, type: sequelize.QueryTypes.SELECT, raw: true });
  const wxQyCorp = wxQyCorps[0];
  if (!wxQyCorp.bind_corpid) {
    let bindCorpId = 0;
    let userId = 0;

    const awaitedResourcesFromSetup = await resourcesFromSetup;
    const resourceCorp = awaitedResourcesFromSetup.get('Corp');
    const modelCorp = resourceCorp[2];

    const corp = await modelCorp.create({
      name: data.corp_name, logo: data.corp_square_logo_url,
      scale: data.corp_scale, industry: data.corp_industry
    });
    bindCorpId = corp.id;

    const resourceUser = awaitedResourcesFromSetup.get('User');
    const modelUser = resourceUser[2];
    const user = await modelUser.create({
      id: data.userid, signName: data.userid, username: data.user_name, emailAddress: '', profilePicture: data.user_avatar
    });
    userId = user.userid;

    const companyInsertResult = await sequelize.query(
      'INSERT INTO company (name, OwnerId, CorpId, createdAt, updatedAt) \n' +
      'VALUES($corpName, $userId, $corpId, now(), now()) \n' +
      'ON DUPLICATE KEY UPDATE name=$corpName, updatedAt=now()',
      {
        bind: {
          corpName: data.corp_name,
          corpScale: data.corp_scale, industry: data.corp_industry,
          userId: userId, corpId: bindCorpId
        },
        type: sequelize.QueryTypes.INSERT, raw: true
      }
    );
    const updateResult = await sequelize.query(
      'UPDATE wx_qy_corp SET bind_corpid=$bindCorpId WHERE corpid=$corpid, updatedAt=now()',
      {
        bind: { corpid: data.corpid, bindCorpId: bindCorpId },
        type: sequelize.QueryTypes.INSERT, raw: true
      }
    );
  }
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
      gApiWxqy.setSuiteTicket(suite_ticket);
      // const suite_ticket_tm = new Date(parseInt(message.TimeStamp) * 1000);
      // 将最新的ticket放到数据库中, 调用用户自己定义的 save_ticket(callback) 方法。
      save_ticketQ(gSequelize, gResources, {suiteId: sc.suiteId, token: sc.token, aesKey: sc.aesKey, ticket: suite_ticket, expired: 10}).then( (result) => {
        res.reply('success');
      });
    } else if (message.InfoType === 'create_auth') {
      res.reply('success');
      console.log('recv create_auth, auth_code:' + message.AuthCode);

      process.nextTick(() => {
        // $work->setSuiteTempAuthCode(message.SuiteId, message.AuthCode);
        gApiWxqy.getPermanentCode(message.AuthCode, ( err, data ) => {
          const permanent_code = data.permanent_code;
          let params = {suiteId: sc.suiteId, permanent_code: permanent_code, userid: data.auth_user_info.userid,
            user_name: data.auth_user_info.name, user_avatar: data.auth_user_info.avatar};
          params = mergeObjects(params, data.auth_corp_info);

          import_corpQ(gSequelize, gResources, params). then( (result) => {
            console.log('import corp finish');
          });
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

  setup(app: {}, sequelize: {}, resources: {}, apiWxqy: {}) {
    gSequelize = sequelize;
    gResources = resources;
    gApiWxqy = apiWxqy;
    app.get('/qywx_suite', app_suite);
    app.post('/qywx_suite', app_suite);
  },

};
