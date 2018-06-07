import modelFields from '../../resourcesBuilder/modelFields';
import PassportLocalSequelize from 'passport-local-sequelize';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userid: {
        type: sequelize.STRING,
        unique: true,
      },
      username: sequelize.STRING,
      emailAddress: sequelize.STRING,
      profilePicture: sequelize.STRING,
      hash: {
        type: sequelize.TEXT,
        allowNull: true,
      },
      salt: {
        type: sequelize.STRING,
        allowNull: true,
      },
      activationKey: {
        type: sequelize.STRING,
        allowNull: true,
      },
      resetPasswordKey: {
        type: sequelize.STRING,
        allowNull: true,
      },
      verified: {
        type: sequelize.BOOLEAN,
        allowNull: true,
      },
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    const model = database.define(name, fields, { tableName: toSnakeCase(name) });

    PassportLocalSequelize.attachToUser( model, {
      usernameField: 'userid',
      hashField: 'hash',
      saltField: 'salt',
    });

    return model;
  },
};
