import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      activity_type: {
        type: sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: '0',
      },
      title: {
        type: sequelize.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      logo: {
        type: sequelize.STRING(255),
        allowNull: false,
        defaultValue: '',
      },
      begin_at: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      end_at: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      introduce: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      reward_rule: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: '0',
      },
      sport_type: {
        type: sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: '0',
      },
      aim_type: {
        type: sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: '0',
      },
      aim_distance: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
      },
      user_cnt: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
      },
      aim_reach_days: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      reach_rate_limit: {
        type: sequelize.INTEGER(11),
        allowNull: false,
        defaultValue: '0',
      },
      day_aim_reward_total_money: {
        type: sequelize.INTEGER(10),
        allowNull: true,
        defaultValue: '0',
      },
      aim_reward_total_money: {
        type: sequelize.INTEGER(10),
        allowNull: true,
        defaultValue: '0',
      },
      allow_unreach: {
        type: sequelize.INTEGER(2),
        allowNull: false,
        defaultValue: '0',
      },
      creater_id: {
        type: sequelize.BIGINT,
        allowNull: false,
        defaultValue: '0',
      },
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
