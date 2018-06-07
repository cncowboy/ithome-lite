import APICorp from 'wechat-corp-service';

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

export const getWxqyAccessToken = (callback) => {
  gApiCorp.getCorpToken((err, token) => {
    callback(err, token);
  });
};

