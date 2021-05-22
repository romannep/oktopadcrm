import fs from 'fs';
import { makeEntitiesFromStructures, use } from 'katejs';
import { AppDoc, AppDocs, AppPrint, AppSettings, AppImport, AppUser } from 'katejs-modules';
import AppTrigger from './katejs-trigger/lib/AppServer';
import AppFields from './katejs-fields/lib/AppServer';
import AppModules from './katejs-runtime-modules/lib/AppServer';

import { structures, title, packageName, Settings } from './structure';

import Order from './entities/Order';
import Payment from './entities/Payment';
import Expense from './entities/Expense';
import Receipt from './entities/Receipt';
import DealComment from './entities/DealComment';

import systemUpdates from './system-updates';

const AppServer = parent => class Server extends
  use(parent, AppUser, AppDoc, AppPrint, AppDocs, AppSettings, AppImport, AppTrigger, AppFields, AppModules) {
  constructor(params) {
    super(params);
    this.title = title; // название приложения
    makeEntitiesFromStructures(this.entities, structures);
    this.entities = {
      ...this.entities,
      Order,
      Payment,
      Expense,
      Receipt,
      DealComment: DealComment(this.entities.DealComment),
    };
    this.entities.DebtRecord.record = true;
    this.entities.MoneyRecord.record = true;
    this.entities.ProductRecord.record = true;
    this.entities.PriceList.doc = true;
    this.entities.Invoice.doc = true;
    // this.skipAuthorization = true;
    this.setAuthParams({ jwtSecret: this.env.jwtSecret || 'default' });
    this.userRegistrationRoleTitle = 'Manager';

    this.settingsParams = Settings;

    this.showUsersList = true;

    this.modules = {
      school: () => require('./modules/school/Server'),
    };

    this.systemUpdates = this.systemUpdates || [];
    this.systemUpdates.push(...systemUpdates);
  }
  async afterInit() {
    if (super.afterInit) {
      super.afterInit();
    }
    if (!fs.existsSync(this.env.updatelog)) {
      fs.writeFileSync(this.env.updatelog, '[]');
    }
    const executedUpdates = JSON.parse(fs.readFileSync(this.env.updatelog));
    for (let i = 0; i < this.systemUpdates.length; i++) {
      const update = this.systemUpdates[i];
      const executed = executedUpdates.find(item => item.name === update.name);
      if (executed) {
        // eslint-disable-next-line no-console
        console.log('Update', update.name, 'executed at', executed.executed);
      } else {
        // eslint-disable-next-line no-await-in-loop
        await update.function();
        // eslint-disable-next-line no-console
        console.log('Executed ', update.name);
        executedUpdates.push({ name: update.name, executed: new Date() });
      }
    }
    fs.writeFileSync(this.env.updatelog, JSON.stringify(executedUpdates));
  }
};
AppServer.package = packageName;
export default AppServer;
