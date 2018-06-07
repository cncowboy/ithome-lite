import APICorp from 'wechat-corp-service';
import { AccessToken } from 'passport-wechat-work';
let gSequelize = null;
let gApiCorp = null;

const get_token = (cb) => {
  cb(null, '');
};

const save_token = (token, cb) => {
  cb(null, token);
};

export const getApiWxqy = (config: {}, sequelize: {}) => {
  gSequelize = sequelize;
  const sc = config.authMethods['wechat-work'];
  const apicorp = new APICorp(sc.suiteId, sc.suiteSecret, '');
  sequelize.query('SELECT * FROM wx_qy_suite WHERE suite_id=$suiteid', { bind: {suiteid: sc.suiteId}, type: sequelize.QueryTypes.SELECT })
    .then(function(wx_suites) {
      if (wx_suites && wx_suites.length>0) {
        const suite = wx_suites[0];
        apicorp.setSuiteTicket(suite.ticket);
        apicorp.getSuiteToken((err, token) => {
          console.log('getApiWxqy, get suite token:');
          console.log(token);
        });
      }
    });
  gApiCorp = apicorp;
  return gApiCorp;
};

export const getWxqyAccessToken = (corpId, callback) => {
  gSequelize.query('SELECT * FROM wx_qy_corp WHERE corpid=$corpId', { bind: {corpId: corpId}, type: gSequelize.QueryTypes.SELECT })
    .then(function(wx_corps) {
      if (wx_corps && wx_corps.length>0) {
        const corp = wx_corps[0];
        const permanentCode = corp.permanent_code;

        gApiCorp.getCorpToken(corpId, permanentCode, (err, token) => {
          console.log('getWxqyAccessToken, get corp token:');
          console.log(token);
          const accessToken = AccessToken(token.access_token, Date.now(), token.expires_in);
          callback(err, accessToken);
        });
      }
    });
};

