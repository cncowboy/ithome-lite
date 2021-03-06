// @flow
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import TwitterStrategy from 'passport-twitter';
import WeappStrategy from 'passport-weixin';
import WechatworkStrategy from 'passport-wechat-work';
import DingdingStrategy from 'passport-dingding';
import AlipayStrategy from 'passport-alipay-oauth2';
import objectAssign from 'object-assign';
import config from '../config';
import utilities from '../utilities';

import { Strategy as LocalStrategy } from 'passport-local';

export default {
  /**
   @name passportOptions
   @type object
   @description Storing the passport strategy for easier iteration
   */
  passportOptions: {
    auth0: Auth0Strategy,
    facebook: FacebookStrategy,
    google: GoogleStrategy,
    twitter: TwitterStrategy,
    // weapp: WeappStrategy,
    'wechat-work': WechatworkStrategy,
    // dingding: DingdingStrategy,
    // alipay: AlipayStrategy,
  },
  /** @function
   * @name getFromProfile
   * @param {object} profile
   * @return {object}
   * @description Makes the profile objects from many strategies uniform
   */
  getFromProfile(profile: {}): {} {
    const returnObj = {};
    /* eslint no-underscore-dangle: ["error", { "allow": ["_json"] }] */
    let profileJson = null;
    if (profile._json) {
      profileJson = ((profile || {})._json || {});
    } else {
      profileJson = profile || {};
    }
    returnObj.username = this.getUsername(profile, profileJson);
    returnObj.emailAddress = this.getEmailAddress(profileJson);
    returnObj.profilePicture = this.getProfilePicture(profileJson);
    return returnObj;
  },
  /** @function
   * @name getUsername
   * @param {object} profile
   * @param {object} profileJson
   * @return {string}
   * @description Helper function for getFromProfile
   */
  getUsername(profile: {}, profileJson: {}): string {
    let username = (profile || {}).displayName;
    if (!username) {
      username = profileJson.first_name;
      if (username) {
        username += ' ';
      }
      username += profileJson.last_name;
    }
    return username;
  },
  /** @function
   * @name getEmailAddress
   * @param {object} profileJson
   * @return {string}
   * @description Helper function for getFromProfile
   */
  getEmailAddress(profileJson: {}): string {
    let emailAddress = profileJson.email;
    if (!emailAddress) {
      emailAddress = profileJson.emails;
      if (emailAddress) {
        emailAddress = (emailAddress[0] || {}).value;
      }
    }
    return emailAddress;
  },
  /** @function
   * @name getProfilePicture
   * @param {object} profileJson
   * @return {string}
   * @description Helper function for getFromProfile
   */
  getProfilePicture(profileJson: {}): string {
    let profilePicture = ((profileJson.picture || {}).data || {}).url;
    if (!profilePicture) {
      profilePicture = profileJson.profile_image_url_https;
    }
    if (!profilePicture) {
      profilePicture = (profileJson.image || {}).url;
    }
    if (!profilePicture) {
      profilePicture = profileJson.picture;
    }
    return profilePicture;
  },
  /** @function
   * @name getUserId
   * @param {object} req
   * @param {object} profile
   * @return {string}
   * @description Helper function for setup
   */
  getUserId(req: {}, profile: {}): string {
    const { id } = ((req || {}).user || {});
    if (!id) {
      return (profile || {}).id;
    }
    return id;
  },
  /** @function
   * @name buildUserObj
   * @param {object} user
   * @param {*} userid
   * @return {object}
   * @description Helper function for setup
   */
  buildUserObj(passportName: '', user: {}, userid: any): {} {
    const userCopy = user;
    if (typeof userid === 'string') {
      userCopy.userid = userid;
    }
    if (!userCopy.userid) {
      utilities.winstonWrapper('Invalid user id in buildUserObj');
    }
    if (!userCopy.username) {
      userCopy.username = userCopy.userid;
    }
    return {
      userid: userCopy.userid,
      passport: passportName,
      username: userCopy.username,
      emailAddress: userCopy.emailAddress,
      profilePicture: userCopy.profilePicture,
      // updatedBy: userCopy.id,
    };
  },
  /** @function
   * @name setup
   * @param {map} resourcesFromSetup
   * @return {object}
   * @description Sets up passport
   */
  setup(resourcesFromSetup: Map): {} {
    let passportConfig = {};
    Object.entries(this.passportOptions).forEach(([passportOptionName, PassportStrategy]) => {
      passportConfig = {
        callbackURL: config.authMethods[passportOptionName].callbackURL,
        passReqToCallback: true,
      };
      if (passportOptionName === 'twitter') {
        passportConfig.consumerKey = config.authMethods[passportOptionName].id;
        passportConfig.consumerSecret = config.authMethods[passportOptionName].secret;
        passportConfig.userProfileURL = 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true';
      } else if (passportOptionName=='wechat-work') {
        objectAssign( passportConfig, config.authMethods['wechat-work'] );
      } else {
        passportConfig.clientID = config.authMethods[passportOptionName].id;
        passportConfig.clientSecret = config.authMethods[passportOptionName].secret;
      }
      if (passportOptionName === 'auth0') {
        passportConfig.domain = config.authMethods[passportOptionName].domain;
      }
      if (passportOptionName === 'facebook') {
        passportConfig.profileFields = config.authMethods[passportOptionName].profileFields;
      }
      if (!(Array.isArray(config.authOptionsDisabled) && config.authOptionsDisabled.indexOf(passportOptionName) !== -1)) {
        console.log(passportOptionName);

        passport.use(new PassportStrategy(passportConfig, (req, accessToken, refreshToken, extraParams, profile, done) => {
          const authAttempt = async () => {
            const userid = this.getUserId(req, profile);
            const awaitedResourcesFromSetup = await resourcesFromSetup;
            const userResource = awaitedResourcesFromSetup.get('User')[2];
            let userErrorMessage = config.messages.userResourceNotFound;
            if (config.environment === 'development' || config.environment === 'testing') {
              userErrorMessage = config.messages.userResourceNotFoundDev;
            }
            utilities.throwErrorConditionally(userResource, userErrorMessage);
            let foundUser = await userResource.findOne({
              attributes: ['id', 'userid', 'username', 'emailAddress', 'profilePicture'],
              where: {userid},
            });
            if (!userid) {
              foundUser = false;
            }
            if (foundUser) {
              if (foundUser.userid && foundUser.username && foundUser.emailAddress && foundUser.profilePicture) {
                done(null, this.buildUserObj(passportOptionName, foundUser, false));
              } else if (foundUser.userid) {
                const userData = this.getFromProfile(profile);
                done(null, this.buildUserObj(passportOptionName, userData, foundUser.userid));
              } else {
                done();
              }
            } else {
              const userData = this.getFromProfile(profile);
              const user = await userResource.create(this.buildUserObj(passportOptionName, userData, userid));
              done(null, this.buildUserObj(passportOptionName, user, false));
            }
          };
          authAttempt().catch(done);
        }));
      }
    });
    passportConfig = {
      callbackURL: config.authMethods['local'].callbackURL,
      passReqToCallback: true,
    };
    objectAssign(passportConfig, config.authMethods['local']);

    passport.use(new LocalStrategy(passportConfig, (req, username, password, done) => {
      const authAttempt = async () => {
        const awaitedResourcesFromSetup = await resourcesFromSetup;
        const userResource = awaitedResourcesFromSetup.get('User')[2];
        const authenticate = userResource.authenticate();
        authenticate(username, password, done);
      };
      authAttempt().catch(done);
    }));

    passport.use('local.register', new LocalStrategy(passportConfig, (req, username, password, done) => {
      const authAttempt = async () => {
        const awaitedResourcesFromSetup = await resourcesFromSetup;
        const userResource = awaitedResourcesFromSetup.get('User')[2];
        userResource.register(username, password, done);
      };
      authAttempt().catch(done);
    }));

    return passport;
  },
};
