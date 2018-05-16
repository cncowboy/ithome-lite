import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/activities', '/activities/:id'];
const permissions = 'lcrud|-----|-----|-----';
const isGroup = true;
const autoAssociations = [{ belongsTo: 'Company' }];

const exportArray = ['Activity', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
