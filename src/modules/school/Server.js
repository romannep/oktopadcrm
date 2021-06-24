import { structures } from './structure';
import { makeEntitiesFromStructures } from 'katejs';
import ProductMixin from './entities/ProductMixin';
import OrderMixin from './entities/OrderMixin';
import School from './entities/School';
import AttendanceMixin from './entities/AttendanceMixin';

export default (app) => {
  makeEntitiesFromStructures(app.entities, structures);
  app.entities.Product = ProductMixin(app.entities.Product);
  app.entities.Order = OrderMixin(app.entities.Order);
  app.entities.School = School;
  app.entities.Attendance = AttendanceMixin(app.entities.Attendance);
}
