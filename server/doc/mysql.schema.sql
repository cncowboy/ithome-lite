CREATE TABLE `corp_activity` (
  `id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `activity_type` int(4) NOT NULL DEFAULT '0' COMMENT '活动类型 0:普通活动 1:节点集合活动, 2:节点活动',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '活动名称',
  `logo` varchar(255) NOT NULL DEFAULT '' COMMENT '活动图片',
  `begin_at` datetime NOT NULL DEFAULT NOW() COMMENT '开始时间',
  `end_at` datetime NOT NULL DEFAULT NOW() COMMENT '结束时间',
  `introduce` text NOT NULL COMMENT '活动介绍',
  `reward_rule` text NOT NULL COMMENT '奖品或奖励方式',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态 -1:删除; 0:未生效 1:已发布 2:已开赛 3:已结束',
  `sport_type` int(4) NOT NULL DEFAULT '0' COMMENT '运动类型',
  `aim_type` int(4) NOT NULL DEFAULT '0' COMMENT '目标类型',
  `aim_distance` int(11) NOT NULL DEFAULT '0' COMMENT '目标距离',
  `user_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '活动参与人数',
  `aim_reach_days` int(11) NOT NULL DEFAULT '0' COMMENT '目标达标天数',
  `reach_rate_limit` int(11) NOT NULL DEFAULT '0' COMMENT '最低团队晋级达标率',
  `day_aim_reward_total_money` int(10) DEFAULT '0',
  `aim_reward_total_money` int(10) DEFAULT '0',
  `allow_unreach` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否允许未达标团队晋级 0:否 1:是',
  `creater_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动创建人id',
  `company_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '所属企业',
  `createAt` datetime NOT NULL DEFAULT NOW() COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT NOW() COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX activity_begin (`begin_at`),
  INDEX company_activity (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='企业活动信息';

CREATE TABLE `corp_activity_user_day_data` (
  `activity_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `user_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'user_id',
  `stat_date` DATE NOT NULL COMMENT '统计日期',
  `distance` int(11) NOT NULL DEFAULT '0' COMMENT '里程数',
  `step` int(11) NOT NULL DEFAULT '0' COMMENT '步数',
  `score` float(8,2) NOT NULL DEFAULT '0.00' COMMENT '积分能量值',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '3:完成 4:失败 5:作弊  其他进行中',
  `createAt` datetime NOT NULL DEFAULT NOW() COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT NOW() COMMENT '更新时间',
  PRIMARY KEY (`activity_id`,`user_id`,`stat_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='企业用户活动按天统计数据';

CREATE TABLE `corp_activity_department_day_data` (
  `activity_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `department_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'department_id',
  `stat_date` DATE NOT NULL COMMENT '统计日期',
  `reach_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '达标人数',
  `distance` int(11) NOT NULL DEFAULT '0' COMMENT '日总里程数',
  `step` int(11) NOT NULL DEFAULT '0' COMMENT '日总步数',
  `reach_rate` int(4) NOT NULL DEFAULT '0' COMMENT '团队达标率',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态 -1:删除; 0:未生效 1:正常',
  `createAt` datetime NOT NULL DEFAULT NOW() COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT NOW() COMMENT '更新时间',
  PRIMARY KEY (`activity_id`,`department_id`,`stat_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='企业部门活动按天统计数据';

CREATE TABLE `corp_activity_user_data` (
  `activity_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `user_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'user_id',
  `reach_rate` int(4) NOT NULL DEFAULT '0' COMMENT '当前达标率',
  `distance` int(11) NOT NULL DEFAULT '0' COMMENT '累计里程数',
  `step` int(11) NOT NULL DEFAULT '0' COMMENT '累计步数',
  `score` float(8,2) NOT NULL DEFAULT '0.00' COMMENT '积分能量值',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '3:完成 4:失败 5:作弊  其他进行中',
  `createAt` datetime NOT NULL DEFAULT NOW() COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT NOW() COMMENT '更新时间',
  PRIMARY KEY (`activity_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='企业用户活动统计数据';

CREATE TABLE `corp_activity_department_data` (
  `department_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'department_id',
  `activity_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `reach_cnt` int(11) NOT NULL DEFAULT '0' COMMENT '达标人数',
  `distance` int(11) NOT NULL DEFAULT '0' COMMENT '累计总里程数',
  `step` int(11) NOT NULL DEFAULT '0' COMMENT '累计总步数',
  `reach_rate` int(4) NOT NULL DEFAULT '0' COMMENT '团队达标率',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态 -1:删除; 0:未生效 1:正常',
  `createAt` datetime NOT NULL DEFAULT NOW() COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT NOW() COMMENT '更新时间',
  PRIMARY KEY (`activity_id`, `department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='企业部门活动统计数据';

CREATE TABLE `corp_user_join` (
  `id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'invite id',
  `company_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'company_id',
  `department_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'department_id',
  `join_type` tinyint NOT NULL DEFAULT '0' COMMENT '加入类型：1：邀请，2： 扫码，3：暗号',
  `inviter_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '邀请人',
  `passport` varchar(40) NOT NULL DEFAULT '0' COMMENT 'passport',
  `passport_user_id` varchar(40) NOT NULL DEFAULT '0' COMMENT '平台userid',
  `passport_user_nick` varchar(40) NOT NULL DEFAULT '0' COMMENT '平台user nick',
  `passport_user_sex` varchar(10) NOT NULL DEFAULT '0' COMMENT '平台user 性别',
  `expired_at` int(11) NOT NULL DEFAULT '0' COMMENT '失效时间',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '状态 -1:删除; -2：失效，0:正常,等待审核，等待接受邀请，1：已经接受',
  `createAt` datetime NOT NULL DEFAULT NOW() COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT NOW() COMMENT '更新时间',
  INDEX corp_user_join_company_idx (company_id),
  UNIQUE corp_user_join_idx (company_id, passport, passport_user_id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='用户加入表';

CREATE TABLE `corp_activity_extra` (
  `activity_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `energy` int(11) NOT NULL DEFAULT '0' COMMENT '能量值',
  `energy_money` int(11) NOT NULL DEFAULT '0' COMMENT '能量对应金额',
  `begin_exchange_energy` int(11) NOT NULL DEFAULT '0' COMMENT '起兑能量值',
  `end_exchange_energy` int(11) NOT NULL DEFAULT '0' COMMENT '封顶能量值',
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='活动额外信息';

CREATE TABLE `corp_activity_like_log` (
  `id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `activity_id` bigint(20) NOT NULL DEFAULT '0' COMMENT '活动id',
  `company_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'company_id',
  `user_id` bigint(20) NOT NULL DEFAULT '0' COMMENT 'department_id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC COMMENT='企业活动点赞记录';
