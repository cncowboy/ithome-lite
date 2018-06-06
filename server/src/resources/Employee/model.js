import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      userid: {
        type: sequelize.INTEGER,
        primaryKey: true,
      },
      nick: sequelize.STRING,
      join_type: sequelize.INTEGER, // 1: 暗号，2：邀请, 3：扫码
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    return database.define(name, fields, { tableName: toSnakeCase(name) });
  },
};
