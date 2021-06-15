import { getElement, Elements } from 'katejs/lib/client';
import { productFields } from '../structure';

const get = (name) => productFields.find(item => item.name === name);

export default Form => class ProductItem extends Form {
  constructor(args) {
    super(args);
    this.elements.set('accountBalances', {
      type: Elements.GRID,
      elements: [
        this.elements.get('accountBalances'),
        {
          ...getElement(get('isSubscription')),
          onChange: () => this.changeIsSubscription(),
        }
      ],
    });
    this.elements.push({
      id: 'subscriptionCard',
      type: Elements.CARD,
      title: 'Subscription settings',
      hidden: true,
      elements: [
        {
          ...getElement(get('attendances')),
          title: 'Attendances limit (0/unset - no limit)',
        },
      ],
    });
  }

  async load() {
    const result = await super.load();
    this.availability();
    return result;
  }

  changeIsSubscription() {
    if (this.content.isSubscription.value) {
      this.content.accountBalances.value = false;
    }
    this.availability();
  }

  availability() {
    this.content.accountBalances.disabled = this.content.isSubscription.value;
    this.content.subscriptionCard.hidden = !this.content.isSubscription.value;
    this.setCardVisibility();
  }
}
