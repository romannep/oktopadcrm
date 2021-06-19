import { orderFields } from '../structure';

export default Entity => class Order extends Entity {
  constructor(args) {
    super(args);
    this.structure.fields = [
      ...this.structure.fields,
      ...orderFields,
    ];
  }
}
