import { use } from 'katejs/lib/client';
import { AppSettings } from 'katejs-modules/lib/client';

import { packageName } from './structure';

const AppClient = parent => class Client extends use(parent, AppSettings) {
  async afterUserInit() {
    if (super.afterUserInit) {
      await super.afterUserInit();
    }
    if (this.settings) {
      const modules = this.settings.modules || [];
      for (let i = 0; i < modules.length; i++) {
        const m = await this.modules[modules[i]]();
        m.default(this);
      }
    }
  }
};
AppClient.package = packageName;
export default AppClient;
