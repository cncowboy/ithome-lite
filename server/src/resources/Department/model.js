import modelFields from '../../resourcesBuilder/modelFields';
import { toSnakeCase } from 'strman';

export default {
  setup(database, sequelize, name, isGroup) {
    let fields = {
      name: sequelize.STRING,
    };
    fields = modelFields.addDefaultFields(fields, sequelize, isGroup);
    return database.define(name, fields, { tableName: toSnakeCase(name) });
  },
};
