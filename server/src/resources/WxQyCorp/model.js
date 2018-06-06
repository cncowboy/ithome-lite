import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      suite_id: sequelize.STRING,
      corpid: { type: sequelize.STRING, unique: true },
      corp_name: sequelize.STRING,
      corp_type: sequelize.STRING,
      corp_square_logo_url: sequelize.STRING,
      corp_user_max: sequelize.INTEGER,
      corp_agent_max: sequelize.INTEGER,
      corp_full_name: sequelize.STRING,
      corp_scale: sequelize.STRING,
      corp_industry: sequelize.STRING,
      corp_sub_industry: sequelize.STRING,
      admin_userid: sequelize.STRING,
      admin_name: sequelize.STRING,
      admin_avatar: sequelize.STRING,
      permanent_code: sequelize.STRING,
      bind_corpid: sequelize.STRING,
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
