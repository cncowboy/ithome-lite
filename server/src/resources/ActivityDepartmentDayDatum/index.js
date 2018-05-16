import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/activitydepartmentdaydata', '/activitydepartmentdaydata/:id'];
const permissions = 'lcrud|-----|-----|-----';
const isGroup = false;
const autoAssociations = [{ belongsTo: 'Activity' }, { belongsTo: 'Company' }, { belongsTo: 'Department' }];

const exportArray = ['ActivityDepartmentDayDatum', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
