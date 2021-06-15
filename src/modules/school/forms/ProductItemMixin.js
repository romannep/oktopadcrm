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
        getElement(get('isAbonement')),
      ],
    });
  }
}
