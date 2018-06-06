import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      reach_cnt: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
      },
      distance: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
      },
      step: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
      },
      reach_rate: {
        type: sequelize.INTEGER(4),
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
      },
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    return database.define(name, fields, { tableName: toSnakeCase(name) });
  },
};
