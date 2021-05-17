import { use } from 'katejs/lib/client';

import { packageName, structures } from './structure';

import ExtraFieldsListItem from './forms/ExtraFieldsListItem';
import ExtraFieldsItemMixin from './forms/ExtraFieldsItemMixin';

const AppClient = parent => class Client extends use(parent) {
  constructor(params) {
    super(params);
    this.init({ structures, addToMenu: true });
    this.forms = {
      ...this.forms,
      ExtraFieldsListItem: ExtraFieldsListItem(this.forms.ExtraFieldsListItem),
    };

    this.entitiesWithExtraFields = [];
    const extraFieldsList = this.menu.find(item => item.form === 'ExtraFieldsListList');
    extraFieldsList.title = 'Extra fields  lists'; // двойной пробел для перевода только меню
  }
  async afterInit() {
    if (super.afterInit) await super.afterInit();

    if (!this.successAuth) {
      await this.updateExtraFieldsLists();
    }
  }
  async afterUserInit() {
    if (super.afterUserInit) await super.afterUserInit();
    await this.updateExtraFieldsLists();
  }
  async updateExtraFieldsLists() {
    const { response: fieldsLists } = await this.ExtraFieldsList.query();
    if (!fieldsLists ) return;
    this.fieldsLists = fieldsLists.reduce((acc, val) => {
      acc[val.entityName] = acc[val.entityName] || [];
      acc[val.entityName] = acc[val.entityName].concat(val.fieldsList);
      return acc;
    }, {});
    Object.keys(this.forms).forEach((formName) => {
      if (
        formName.endsWith('Item')
        && this.entitiesWithExtraFields.indexOf(this.forms[formName].entity) > -1
        && !this.forms[formName].extraFieldsApplied
      ) {
        this.forms[formName] = ExtraFieldsItemMixin(this.forms[formName]);
      }
    });
  }
};
AppClient.package = packageName;
export default AppClient;
