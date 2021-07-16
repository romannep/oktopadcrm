import { Elements, getElement } from 'katejs/lib/client';
import { orderFields } from '../structure';
import { SUBSCRIPTION_LIMIT, subscriptionTable } from './ClientItemMixin';

export default Form => class OrderItem extends Form {
  constructor(args) {
    super(args);
    const subscriptionElements = [
      {
        type: Elements.GRID,
        elements: [
          {
            type: Elements.GROUP,
            div: true,
            elements:[
              {
                ...getElement(orderFields[0]),
                onChange: () => this.isSubscriptionChange(),
                value: true,
                disabled: !!this.uuid,
              },
            ],
            style: { marginTop: 20, marginBottom: 15 },
          },
          {
            ...getElement(orderFields[1]),
            value: new Date(),
            disabled: !!this.uuid,
          },
        ],
      },
      {
        id: 'subscriptionsCard',
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
      },
    ];
    this.elements.splice(this.elements.findIndex(item => item.id === 'paymentGrid') + 1, 0, ...subscriptionElements);
  }

  async load() {
    const result = await super.load();
    this.availablity();
    this.loadSubscriptions();
    return result;
  }

  isSubscriptionChange() {
    this.content.subscriptionStarts.value = new Date();
    this.availablity();
  }

  availablity() {
    this.content.subscriptionStarts.hidden = !this.content.createSubscription.value;
  }

  async loadSubscriptions() {
    const { response: subscriptions } = await this.app.Subscription.query({
      where: { orderUuid: this.uuid },
      order: [['expiredDate','DESC']],
      limit: SUBSCRIPTION_LIMIT,
    });
    this.content.subscriptionsCard.hidden = subscriptions.length < 1;
    this.content.subscriptions.value = subscriptions;
  }

  openSubscription(row) {
    this.app.open('SubscriptionItem', { id: row.uuid });
  }
}
