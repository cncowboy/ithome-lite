import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      join_type: {
        type: sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: '0',
      },
      passport: {
        type: sequelize.STRING(40),
        allowNull: false,
        defaultValue: '0',
      },
      passport_user_id: {
        type: sequelize.STRING(40),
        allowNull: false,
        defaultValue: '0',
      },
      passport_user_nick: {
        type: sequelize.STRING(40),
        allowNull: false,
        defaultValue: '0',
      },
      passport_user_sex: {
        type: sequelize.STRING(10),
        allowNull: false,
        defaultValue: '0',
      },
      expired_at: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
      },
      status: {
        type: sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: '0',
      },
      createAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      }
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    return database.define(name, fields, { tableName: toSnakeCase(name) });
  },
};
