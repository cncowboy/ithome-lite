import 'babel-core/register';
import 'babel-polyfill';
import express from 'express';
import winston from 'winston';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import expressJwt from 'express-jwt';
import flash from 'connect-flash';
import childProcess from 'child_process';
import utilities from './utilities';
import config from './config';
import Passport from './auth/passport';
import epilogueSetup from './epilogueSetup';
import authEndpoints from './auth/endpoints';
import epilogueAuth from './auth/epilogueAuth';
import spawnTest from '../test/setup/spawnTest';
import server from './server';

import platformCbEndpoints from './platform-callback/endpoints';
import { getApiWxqy } from './platform-callback/api_wxqy';
import businessEndpoints from './business/endpoints';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: utilities.yesTrueNoFalse(config.urlencodedExtended) }));
app.use(cookieParser());

// --------------------logging------------------------
const winstonConfig = utilities.setUpWinstonLogger('logs/general.log');
winston.add(winston.transports.File, winstonConfig);
winston.setLevels(winston.config.syslog.levels);
spawnTest.logging(childProcess);
// --------------------epilogue-----------------------
const database = new Sequelize(config.dbString);
const groupXrefModel = epilogueSetup.setupEpilogue(app, database, Sequelize);
const resources = epilogueSetup.setupResources(database, Sequelize, groupXrefModel);
// ---------------------auth--------------------------
const passport = Passport.setup(resources);

app.use(expressJwt({
  secret: config.jwt.secret,
  credentialsRequired: utilities.yesTrueNoFalse(config.jwt.credentialsRequired),
  getToken: req => req.cookies.id_token,
}));

app.use(flash());
app.use(passport.initialize());

epilogueAuth.setupAuthCheck(resources, groupXrefModel, database);

authEndpoints.setup(app, passport);

const apiWxqy = getApiWxqy(config, database);
platformCbEndpoints.setup(app, database, resources, apiWxqy);

businessEndpoints.setup(app, database, resources);
// ---------------------server------------------------
server.serve(database, server.createServerObject(app), resources, groupXrefModel);
