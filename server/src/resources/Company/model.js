import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      name: sequelize.STRING,
      city: sequelize.INTEGER, // 所在城市
      adress: sequelize.STRING,
      intro: sequelize.STRING, // 介绍
      secret_code: sequelize.STRING, // 暗号
      join_type: sequelize.INTEGER, // 0：允许任何人加入，1：暗号验证加入，2：不允许任何人加入
      join_notify: sequelize.BOOLEAN, // 加入通知
      createdAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    return database.define(name, fields, { tableName: toSnakeCase(name) });
  },
};
