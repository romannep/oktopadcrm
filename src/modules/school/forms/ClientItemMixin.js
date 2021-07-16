import moment from 'moment';
import { Elements } from 'katejs/lib/client';

export const SUBSCRIPTION_LIMIT = 5;

const dateFormat = (val) => val ? moment(val).format('DD.MM.YYYY HH:mm') : '---';

export const subscriptionTable = (app) => ({
  id: 'subscriptions',
  type: Elements.TABLE,
  columns: [
    {
      title: 'Attendances',
      dataPath: 'attendances',
    },
    {
      title: 'Validity amount',
      dataPath: 'validityAmount',
    },
    {
      title: 'Validity type',
      dataPath: 'validityType',
      format: val => app.t(val.charAt(0).toUpperCase() + val.slice(1)),
    },
    {
      title: 'Start date',
      dataPath: 'startDate',
      format: dateFormat,
    },
    {
      title: 'Expired date',
      dataPath: 'expiredDate',
      format: dateFormat,
    },
    {
      title: 'Visits',
      dataPath: 'visits',
    },
    {
      title: 'Closed',
      dataPath: 'closed',
      format: val => val ? 'Да' : 'Нет',
    },
    {
      title: 'Sum',
      dataPath: 'sum',
    },
  ],
});

export default Form => class ClientItemMixin extends Form {
  constructor(args) {
    super(args);

    const subscriptionsCard = {
      type: Elements.CARD,
      elements: [
        {
          type: Elements.LABEL,
          tag: 'h3',
          title: 'Subscriptions',
        },
        {
          ...subscriptionTable(this.app),
          rowClick: (row) => this.openSubscription(row),
        },
      ],
    };

    const reportGrid = this.elements.cut('reportGrid');
    this.elements.push(subscriptionsCard);
    this.elements.push(reportGrid);
  }

  load() {
    if (this.uuid) {
      this.loadSubscriptions();
    }
    return super.load();
  }

  async loadSubscriptions() {
    const { response: subscriptions } = await this.app.Subscription.query({
      where: { clientUuid: this.uuid },
      order: [['expiredDate','DESC']],
      limit: SUBSCRIPTION_LIMIT,
    });
    this.content.subscriptions.value = subscriptions;
  }

  openSubscription(row) {
    this.app.open('SubscriptionItem', { id: row.uuid });
  }
}
