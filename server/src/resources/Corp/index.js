import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/corps', '/corps/:id'];
const permissions = 'lcrud|-----|-----|-----';
const isGroup = false;
const autoAssociations = '';

const exportArray = ['Corp', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
