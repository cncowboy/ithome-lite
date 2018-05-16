import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/activitydepartmentdata', '/activitydepartmentdata/:id'];
const permissions = 'lcrud|-----|-----|-----';
const isGroup = false;
const autoAssociations = [{ belongsTo: 'Activity' }, { belongsTo: 'Company' }, { belongsTo: 'Department' }];

const exportArray = ['ActivityDepartmentDatum', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
