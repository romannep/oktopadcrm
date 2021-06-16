import { getElement, Elements, getTableElement } from 'katejs/lib/client';
import { productFields, ValidityType, ValidityTypeOptions, productTables } from '../structure';

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
    const validityType = {
      id: 'validityType',
      title: 'Validity',
      type: Elements.SELECT,
      selectValue: true,
      options: ValidityTypeOptions,
      onChange: () => this.availability(),
    };
    const validityAmount = {
      ...getElement(get('validityAmount')),
      title: 'Amount',
    };

    this.validityElements = {
      amount: [validityAmount, validityType],
      perpetual: [validityType],
    };
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
        {
          type: Elements.GRID,
          id: 'validityGrid',
          elements: this.validityElements.perpetual,
        },
        {
          ...getTableElement(productTables[0], this),
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
    const hideValidityAmount = (this.content.validityType.value !== ValidityType.Days) && (this.content.validityType.value !== ValidityType.Months);
    this.validityElements.amount[1].value = this.content.validityType.value;
    this.validityElements.perpetual[0].value = this.content.validityType.value;
    this.content.validityGrid.elements = hideValidityAmount ? this.validityElements.perpetual : this.validityElements.amount;
    this.setCardVisibility();
  }
}
