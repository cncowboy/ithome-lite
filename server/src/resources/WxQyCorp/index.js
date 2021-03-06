import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/wxqycorps', '/wxqycorps/:id'];
const permissions = '-----|-----|-----|-----';
const isGroup = false;
const autoAssociations = '';

const exportArray = ['WxQyCorp', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
