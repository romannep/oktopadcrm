import { structures } from './structure';
import { makeEntitiesFromStructures } from 'katejs';
import ProductMixin from './entities/ProductMixin';

export default (app) => {
  makeEntitiesFromStructures(app.entities, structures);
  app.entities.Product = ProductMixin(app.entities.Product);
}
