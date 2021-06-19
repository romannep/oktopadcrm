import { Elements, getElement } from 'katejs/lib/client';
import { orderFields } from '../structure';

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
              },
            ],
            style: { marginTop: 20, marginBottom: 15 },
          },
          getElement(orderFields[1]),
        ],
      }
    ];
    this.elements.splice(this.elements.findIndex(item => item.id === 'paymentGrid') + 1, 0, ...subscriptionElements);
  }

  async load() {
    const result = await super.load();
    this.availablity();
    return result;
  }

  isSubscriptionChange() {
    this.content.subscriptionStarts.value = new Date();
    this.availablity();
  }

  availablity() {
    this.content.subscriptionStarts.hidden = !this.content.createSubscription.value;
  }
}
