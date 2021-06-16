import { productFields, productTables } from '../structure';
import Fields from 'katejs/lib/fields';

export default Entity => class Product extends Entity {
  constructor(args) {
    super(args);
    this.structure.fields = [
      ...this.structure.fields,
      {
        name: 'isSubscription',
        type: Fields.BOOLEAN,
      },
      ...productFields,
    ];
    this.structure.tables = [
      ...(this.structure.tables || []),
      ...productTables,
    ];
  }
}
