import { productFields, productTables } from '../structure';

export default Entity => class Product extends Entity {
  constructor(args) {
    super(args);
    this.structure.fields = [
      ...this.structure.fields,
      ...productFields,
    ];
    this.structure.tables = [
      ...(this.structure.tables || []),
      ...productTables,
    ];
  }
}
