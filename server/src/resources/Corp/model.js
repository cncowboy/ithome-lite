import modelFields from '../../resourcesBuilder/modelFields';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      name: sequelize.STRING,
      logo: sequelize.STRING, //公司标志
      scale: sequelize.STRING, //公司规模
      industry: sequelize.STRING, //行业
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
    return database.define(name, fields);
  },
};
