import { structures } from './structure';
import { makeEntitiesFromStructures } from 'katejs';

export default (app) => {
  makeEntitiesFromStructures(app.entities, structures);
}
