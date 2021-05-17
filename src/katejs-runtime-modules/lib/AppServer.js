import { use } from 'katejs';
import { AppSettings } from 'katejs-modules';
import { packageName } from './structure';
import SettingsMixin from './entities/SettingsMixin';


const AppServer = parent => class Server extends use(parent, AppSettings) {
  constructor(params) {
    super(params);

  }
  beforeInit() {
    if (super.beforeInit) super.beforeInit();
    this.entities.Settings = SettingsMixin(this.entities.Settings);

    (this.env.modules || []).forEach((module) => this.modules[module]().default(this));
  }
};
AppServer.package = packageName;
export default AppServer;
