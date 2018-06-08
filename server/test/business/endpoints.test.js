import 'babel-polyfill';
let srcOrBuild;
if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
  srcOrBuild = 'build';
} else {
  srcOrBuild = 'src';
}
const groups = require(`../../${srcOrBuild}/auth/groups`).default;
const config = require(`../../${srcOrBuild}/config`);
const utilities = require(`../../${srcOrBuild}/utilities`);
import assert from 'assert';
import Sequelize from 'sequelize';
import express from 'express';
import epilogueSetup from '../../src/epilogueSetup';

import businessEndpoints from '../../src/business/endpoints';

const app = express();

const database = new Sequelize(config.dbString);

const groupXrefModel = epilogueSetup.setupEpilogue(app, database, Sequelize);
const resources = epilogueSetup.setupResources(database, Sequelize, groupXrefModel);


describe('getInitInfo', () => {
  it('normal', done => {
    businessEndpoints.getInitInfo(resources, database, {id: 1}).then(result=>{
      assert.notEqual(result, null);
      done();
    });
  }).timeout(0);
});
