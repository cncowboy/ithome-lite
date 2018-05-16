import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/userjoins', '/userjoins/:id'];
const permissions = 'lcrud|-----|-----|-----';
const isGroup = false;
const autoAssociations = [{ belongsTo: 'Department' }, { belongsTo: 'Company' }, { belongsTo: 'User' }];

const exportArray = ['UserJoin', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
