import config from '../config';
import Sequelize from 'sequelize';

let gDatabase = null;
let gResources = null;

const layoutDepartment = (parentDep, dep_list) => {
  const departments = {};
  for (let d of dep_list) {
    if (!parentDep) {
      if (d.DepartmentId) {
        continue;
      }
    } else {
      if (parentDep.id !== d.DepartmentId) {
        continue;
      }
    }
    const sub_deps = layoutDepartment(d, dep_list);
    d.departments = sub_deps;
    departments[d.id] = d.toJSON();
  }
  return departments;
}

const getInitInfo = async (resourcesFromSetup, database, user) => {
  const awaitedResourcesFromSetup = await resourcesFromSetup;
  const resourceEmployee = awaitedResourcesFromSetup.get('Employee');
  const modelEmployee = resourceEmployee[2];

  const employees = await modelEmployee.findAll({
    where: {
      UserId: user.id,
    },
  });

  let activedEmployee = null;
  let company_ids = [];
  let companies = {};
  let departments = {};

  if (employees.length === 1) {
    activedEmployee = employees[0].toJSON();
    company_ids.push(employees[0].CompanyId);
  } else if (employees.length > 0) {
    for (let e of employees) {
      if (e.actived) {
        activedEmployee = e;
      }
      company_ids.push(e.CompanyId);
    }
    if (!activedEmployee) {
      activedEmployee = employees[0].toJSON();
    }
  }

  if (company_ids.length > 0) {
    const resourceCompany = awaitedResourcesFromSetup.get('Company');
    const modelCompany = resourceCompany[2];
    const company_list = await modelCompany.findAll({
      where: {
        id: { [Sequelize.Op.in]: company_ids },
      },
    });
    for (let c of company_list) {
      companies[c.id] = c.toJSON();
    }
  }

  if (activedEmployee) {
    const resourceDepartment = awaitedResourcesFromSetup.get('Department');
    const modelDepartment = resourceDepartment[2];
    const dep_list = await modelDepartment.findAll({
      where: {
        CompanyId: activedEmployee.CompanyId,
      },
    });
    companies[activedEmployee.CompanyId]['departments'] = layoutDepartment(null, dep_list);
  }

  return {
    user: user,
    activedEmployee: activedEmployee,
    companies: companies,
  };

};

const controller_getInitInfo = (req, res) => {
  if (req.user) {
    const user = req.user;

    getInitInfo(gResources, gDatabase, user).then((result) => {
      res.json(result);
    });
  } else {
    res.end(config.messages.getUserDataTestError);
  }
};

export default {

  setup(app: {}, database: {}, resources: {}) {
    gDatabase = database;
    gResources = resources;
    app.all('/getInitInfo', controller_getInitInfo);
  },
  getInitInfo,

};
