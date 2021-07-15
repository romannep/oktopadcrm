import { structures } from './structure';
import { makeEntitiesFromStructures } from 'katejs';
import ProductMixin from './entities/ProductMixin';
import OrderMixin from './entities/OrderMixin';
import School from './entities/School';
import AttendanceMixin from './entities/AttendanceMixin';
import ClassMixin from './entities/ClassMixin';
import SubscriptionMixin from './entities/SubscriptionMixin';
import ClientMixin from './entities/ClientMixin';

export default (app) => {
  makeEntitiesFromStructures(app.entities, structures);
  app.entities.Product = ProductMixin(app.entities.Product);
  app.entities.Order = OrderMixin(app.entities.Order);
  app.entities.School = School;
  app.entities.Attendance = AttendanceMixin(app.entities.Attendance);
  app.entities.Class = ClassMixin(app.entities.Class);
  app.entities.Subscription = SubscriptionMixin(app.entities.Subscription);
  app.entities.Client = ClientMixin(app.entities.Client);
}
