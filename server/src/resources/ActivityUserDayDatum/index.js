import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/activityuserdaydata', '/activityuserdaydata/:id'];
const permissions = 'lcrud|-----|-----|-----';
const isGroup = false;
const autoAssociations = [{ belongsTo: 'Activity' }, { belongsTo: 'Company' }, { belongsTo: 'User' }];

const exportArray = ['ActivityUserDayDatum', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
