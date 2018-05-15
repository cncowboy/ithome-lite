import modelFields from '../../resourcesBuilder/modelFields';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      title: sequelize.STRING,
      logo: sequelize.STRING,
      begin_at: sequelize.DATE,
      end_at: sequelize.DATE,
      sport_type: sequelize.INTEGER,
      aim_type: sequelize.INTEGER,
      aim_distance: sequelize.INTEGER,
      reach_rate_limit: sequelize.INTEGER,
      status: sequelize.INTEGER,
      activity_type: sequelize.INTEGER,

      `sport_type` int(4) NOT NULL DEFAULT '0' COMMENT '运动类型',
      `aim_type` int(4) NOT NULL DEFAULT '0' COMMENT '目标类型',
      `aim_distance` int(11) NOT NULL DEFAULT '0' COMMENT '目标距离',
      `reach_rate_limit` int(11) NOT NULL DEFAULT '0' COMMENT '最低团队晋级达标率',
      `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态 -1:删除; 0:未生效 1:已发布 2:已开赛 3:已结束',
      `activity_type` int(4) NOT NULL DEFAULT '0' COMMENT '活动类型 0:普通活动 1:节点活动',
      `update_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新时间',
      `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
      `user_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '活动参与人数',
      `aim_reach_days` int(11) NOT NULL DEFAULT '0' COMMENT '目标达标天数',
      `day_aim_reward_total_money` int(10) DEFAULT '0',
      `aim_reward_total_money`
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    return database.define(name, fields);
  },
};
