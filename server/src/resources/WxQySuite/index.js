import extension from './extension';
import model from './model';
import milestones from './milestones';

const endpoints = ['/wx_qy_suites', '/wx_qy_suites/:id'];
const permissions = '-----|-----|-----|-----';
const isGroup = false;
const autoAssociations = '';

const exportArray = ['wx_qy_suite', permissions, model, endpoints, extension, autoAssociations, isGroup, milestones];

export default exportArray;
