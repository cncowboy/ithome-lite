import modelFields from '../../resourcesBuilder/modelFields';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      name: sequelize.STRING,
      logo: sequelize.STRING, //公司标志
      size: sequelize.INTEGER, //公司规模
      industry: sequelize.INTEGER, //行业
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    return database.define(name, fields);
  },
};
