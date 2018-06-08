import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      name: sequelize.STRING,
      city: {
        type: sequelize.STRING,
        allowNull: true,
        defaultValue: '',
      }, // 所在城市
      adress: {
        type: sequelize.STRING,
        allowNull: true,
        defaultValue: '',
      },
      intro: {
        type: sequelize.TEXT,
        allowNull: true,
        defaultValue: '',
      }, // 介绍
      secret_code: {
        type: sequelize.STRING,
        defaultValue: '',
      }, // 暗号
      join_type: {
        type: sequelize.INTEGER,
        defaultValue: 1,
      }, // 0：允许任何人加入，1：暗号验证加入，2：不允许任何人加入
      join_notify: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
      }, // 加入通知
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
    const schema = database.define(name, fields, { tableName: toSnakeCase(name) });
    schema.prototype.createSecretCode = () => {
      let num = '';
      for (let i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 10);
      }
      return num;
    };
  },
};
