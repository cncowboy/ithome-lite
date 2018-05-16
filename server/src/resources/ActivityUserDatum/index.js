import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/activityuserdata', '/activityuserdata/:id'];
const permissions = 'lcrud|-----|-----|-----';
const isGroup = false;
const autoAssociations = [{ belongsTo: 'Activity' }, { belongsTo: 'Company' }, { belongsTo: 'User' }];

const exportArray = ['ActivityUserDatum', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
