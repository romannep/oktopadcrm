import chiefRole from './chief';
import supportRole from './support';
import chiefSchoolRole from './chiefSchool';
import supportSchoolRole from './supportSchool';

// const roles = [
//   chiefRole,
//   supportRole,
// ];

const roles = [
  chiefSchoolRole,
  supportSchoolRole,
];

// может быть несколько обновлений с ролями - применяем только один раз
let rolesUpdated = false;

// eslint-disable-next-line import/prefer-default-export
export const updateRoles = async (app) => {
  if (rolesUpdated) {
    return;
  }
  rolesUpdated = true;
  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const { response: findRoles } = await app.Role.query({
      data: {
        where: {
          title: role.body.title,
        },
      },
    });
    let uuid;
    if (findRoles && findRoles[0]) {
      uuid = findRoles[0].uuid;
    }
    await app.Role.put({
      data: {
        body: role.body,
        uuid,
      },
    });
  }
};
