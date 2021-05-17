import { use } from 'katejs/lib/client';
import { AppDoc, AppDocs, AppPrint, AppSettings, AppImport, AppUser } from 'katejs-modules/lib/client';
import AppTrigger from './katejs-trigger/lib/AppClient';
import AppFields from './katejs-fields/lib/AppClient'
import AppModules from './katejs-runtime-modules/lib/AppClient';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'moment/locale/ru';
import 'katejs/lib/client.css';

import { structures, title, packageName, Settings } from './structure';

import SchoolModule from './modules/school/Client';

import NoteItem from './forms/NoteItem';
import NoteList from './forms/NoteList';
import ProductSalesReport from './forms/ProductSalesReport';
import OrdersToDeliverReport from './forms/OrderToDeliverReport';
import OrderList from './forms/OrderList';
import OrderItem from './forms/OrderItem';
import PaymentItem from './forms/PaymentItem';
import CashFlow from './forms/CashFlow';
import OrderDynamics from './forms/OrderDynamics';
import ClientListMixin from './forms/ClientListMixin';
import ClientItemMixin from './forms/ClientItemMixin';
import Dashboard from './forms/Dashboard';
import ExpenseItem from './forms/ExpenseItem';
import ReceiptItemMixin from './forms/ReceiptItemMixin';
import ProductsFlowReport from './forms/ProducsFlowReport';
import DebtsFlowReport from './forms/DebtsFlowReport';
import ProductItemMixin from './forms/ProductItemMixin';
import DealItem from './forms/DealItem';
import TaskItem from './forms/TaskItem';
import DealList from './forms/DealList';
import SaleSchemaItem from './forms/SaleSchemaItem';
import TaskList from './forms/TaskList';
import InvoiceItem from './forms/InvoiceItem';

import Components from './components';

import updates from './updates';
import logo from './oktopad.svg';
import icons from './icons';

import env from './front.env.json';

const AppClient = parent => class Client extends
  use(parent, AppUser, AppDoc, AppPrint, AppSettings, AppDocs, AppImport, AppTrigger, AppFields, AppModules) {
  static title = title;
  static path = '/app';
  static primaryColor = '#088596';
  static logo = logo;
  // static useLogger = true;
  constructor(params) {
    super(params);
    this.constructor.components = { ...this.constructor.components, ...Components };

    this.baseUrl = env.apiUrl || '/api';

    this.vars = {};

    this.menu.unshift(
      {
        title: 'Reports',
        icon: icons.OrderDynamics,
        rule: { entity: 'Order', method: 'put' },
        submenu: [
          {
            form: 'ProductSalesReport',
            title: 'Product sales',
          },
          {
            form: 'OrdersToDeliverReport',
            title: 'Orders to deliver',
          },
          {
            form: 'CashFlow',
            title: 'Cash flow',
          },
          {
            form: 'OrderDynamics',
            title: 'Order dynamics',
          },
          {
            form: 'ProductsFlowReport',
            title: 'Product flow',
          },
          {
            form: 'DebtsFlowReport',
            title: 'Debt flow',
          },
        ],
      },
    );

    this.init({ structures, addToMenu: true });
    this.forms = {
      ...this.forms,
      NoteItem,
      NoteList,
      OrderList: OrderList(this.forms.OrderList),
      OrderItem: OrderItem(this.forms.OrderItem),
      PaymentItem,
      ClientList: ClientListMixin(this.forms.ClientList),
      ClientItem: ClientItemMixin(this.forms.ClientItem),
      ProductItem: ProductItemMixin(this.forms.ProductItem),
      DealItem: DealItem(this.forms.DealItem),
      TaskItem: TaskItem(this.forms.TaskItem),
      DealList: DealList(this.forms.DealList),
      SaleSchemaItem: SaleSchemaItem(this.forms.SaleSchemaItem),
      TaskList: TaskList(this.forms.TaskList),
      InvoiceItem: InvoiceItem(this.forms.InvoiceItem),

      ProductSalesReport,
      OrdersToDeliverReport,
      CashFlow,
      OrderDynamics,
      Dashboard,
      ExpenseItem,
      ReceiptItem: ReceiptItemMixin(this.forms.ReceiptItem),
      ProductsFlowReport,
      DebtsFlowReport,
     };

    this.forms.PaymentList.doc = true;
    this.forms.ExpenseList.doc = true;
    this.forms.ExpenseItem.doc = true;
    this.forms.PriceListList.doc = true;
    this.forms.PriceListItem.doc = true;
    this.forms.ReceiptList.doc = true;
    this.forms.InvoiceList.doc = true;

    this.saveAuth = true;
    this.docsContent.push(...updates);

    this.userAuthorization = {
      usernameTitle: 'User',
    };
    this.userHideRecovery = true;

    this.docsAccessFilter = (docsItem) => {
      if (docsItem.entity === 'System') return true;
      if (docsItem.entity === 'Agent app') return this.allow('Order', 'put') || this.allow('Order', 'take');
      return this.allow(docsItem.entity, 'put');
    };

    // temp no dasboard
    // this.menu.unshift({
    //   title: 'Dashboard',
    //   form: 'Dashboard',
    //   rule: {
    //     entity: 'Order',
    //     method: 'put',
    //   },
    // });

    this.menu.forEach((item) => {
      if (icons[item.form]) {
        // eslint-disable-next-line no-param-reassign
        item.icon = icons[item.form];
      }
      if (item.submenu) {
        item.submenu.forEach((sitem) => {
          if (icons[sitem.form]) {
            // eslint-disable-next-line no-param-reassign
            sitem.icon = icons[sitem.form];
          }
        });
      }
    });

    this.menu.forEach((menuItem) => {
      if (this.forms[menuItem.form] && this.forms[menuItem.form].entity) {
        // eslint-disable-next-line no-param-reassign
        menuItem.rule = {
          entity: this.forms[menuItem.form].entity,
          method: 'put',
        };
      }
      if (menuItem.submenu) {
        menuItem.submenu.forEach((submenuItem) => {
          if (this.forms[submenuItem.form] && this.forms[submenuItem.form].entity) {
            // eslint-disable-next-line no-param-reassign
            submenuItem.rule = {
              entity: this.forms[submenuItem.form].entity,
              method: 'put',
            };
          }
        });
      }
    });
    this.settingsParams = Settings;

    this.menu.unshift(
      this.spliceMenuItem('Deals'),
      this.spliceMenuItem('Tasks'),
      this.spliceMenuItem('Clients'),
    );
    this.spliceMenuItem('Extra field values lists'); // temp - remove from menu
    this.spliceMenuItem('Contacts'); // temp - remove from menu
    this.spliceMenuItem('What\'s new'); // temp
    this.spliceMenuItem('Entity descriptions'); // temp
    this.spliceMenuItem('Notes'); // temp

    this.entitiesWithExtraFields = ['Deal', 'Task', 'Client'];

    // make submenu
    this.initSubmenu('Payments', 'Money');
    this.addSubmenu('Money', 'Expenses');
    this.addSubmenu('Money', 'Cashboxs');
    this.initSubmenu('Products', 'Products');
    this.addSubmenu('Products', 'Price types');
    this.addSubmenu('Products', 'Price lists');
    this.addSubmenu('Products', 'Receipts');
    this.initSubmenu('Settings', 'Settings', 'Basic');
    this.addSubmenu('Settings', 'Sale schemas');
    this.addSubmenu('Settings', 'Extra fields  lists');
    this.addSubmenu('Settings', 'Triggers');
    this.addSubmenu('Settings', 'Import');
    this.addSubmenu('Settings', 'Print templates');

    this.allowCreateInSelect = true;
    this.schemas = {};

    this.showUsersList = true;

    this.modules = {
      school: () => import('./modules/school/Client'),
    }
  }
  initSubmenu(nameInitial, nameTarget, submenuTitle = '') {
    const item = this.menu.find(i => i.title === nameInitial);
    item.submenu = [];
    item.submenu.push({
      title: submenuTitle || item.title,
      form: item.form,
      icon: item.icon,
      role: item.role,
    });
    item.title = nameTarget;
    delete item.form;
  }
  addSubmenu(submenuName, itemName) {
    const itemIndex = this.menu.findIndex(i => i.title === itemName);
    const submenu = this.menu.find(i => i.title === submenuName);
    if (!this.menu[itemIndex].icon) {
      this.menu[itemIndex].icon = submenu.icon;
    }
    submenu.submenu.push(this.menu[itemIndex]);
    this.menu.splice(itemIndex, 1);
  }
  spliceMenuItem(itemTitle) {
    const index = this.menu.findIndex(item => item.title === itemTitle);
    if (index > -1) {
      return this.menu.splice(index, 1)[0];
    }
  }
  async afterUserInit() {
    if (super.afterUserInit) {
      await super.afterUserInit();
    }
    await this.fetchSchemas();
  }
  async fetchSchemas() {
    const { response: schemas } = await this.SaleSchema.query();
    if (!schemas) return;
    this.schemas = schemas.reduce((acc, val) => ({ ...acc, [val.uuid]: val}), {});
  }
};
AppClient.package = packageName;
export default AppClient;
